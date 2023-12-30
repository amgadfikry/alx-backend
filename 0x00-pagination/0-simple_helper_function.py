#!/usr/bin/env python3
""" module that paginate simple method """


def index_range(page, page_size):
    """ function get index of start and end
        of items per page
        Params:
            page: page number
            page_size: number of items per page
        Return:
            tuple of index start and end of items
    """
    if page < 1:
        return (0, 0)
    end = page * page_size
    return (end - page_size, end)
