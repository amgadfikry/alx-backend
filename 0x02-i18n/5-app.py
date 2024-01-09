#!/usr/bin/env python3
""" module to basic setup of flask """
from flask import Flask, render_template, request, g
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)


class Config:
    """ class to create configuraton languages """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)


@babel.localeselector
def get_locale():
    """ determine best match with language """
    requested_locale = request.args.get('locale')
    if requested_locale and requested_locale in app.config['LANGUAGES']:
        return requested_locale
    return request.accept_languages.best_match(app.config['LANGUAGES'])


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user(login_as):
    """ function that return user """
    login_as = request.args.get('login_as')
    if login_as and int(login_as) in users:
        return users[int(login_as)]
    return None


@app.before_request
def before_request():
    """ function that find user and set it as global on flask.g.user """
    g.user = get_user(request.args.get('login_as'))


@app.route('/')
def get_template():
    """ function that render route '/' and it's template """
    return render_template('5-index.html')


if __name__ == '__main__':
    app.run()
