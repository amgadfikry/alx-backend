#!/usr/bin/env python3
""" basic cache module """
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """ class for create basic cache
        how to save item and how get in cache
    """

    def put(self, key, item):
        """ method to add new item to cache
            params:
                key: key of new item
                value: value of item
        """
        if key is not None or item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """ method to get item from cache
            params:
                key: key of new item
        """
        if key is None:
        	return None
        value = self.cache_data.get(key)
        if value:
            return value
        return None
