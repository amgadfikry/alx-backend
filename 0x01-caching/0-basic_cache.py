#!/usr/bin/env python3
""" basic cache module """
from base_caching import BaseCaching
from typing import Union


class BasicCache(BaseCaching):
    """ class for create basic cache
        how to save item and how get in cache
    """

    def put(self, key: Union[None, str], item: Union[str, None]) -> None:
        """ method to add new item to cache
            params:
                key: key of new item
                value: value of item
        """
        if key is not None or item is not None:
            self.cache_data[key] = item

    def get(self, key: Union[None, str]) -> Union[str, None]:
        """ method to get item from cache
            params:
                key: key of new item
        """
        if key is None or key not in self.cache_data:
        	return None
        return self.cache_data.get(key)
