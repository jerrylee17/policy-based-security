import time
import requests
from urllib3 import Retry
from functools import wraps
from requests.adapters import HTTPAdapter


def timeit(func):
        """
        time the given function

        :param func: function name
        :return:  wrapper for given function
        """
        @wraps(func)
        def wrapper(*args, **kwargs):
            'wrapper'
            start = time.time()
            result = func(*args, **kwargs)
            stop = time.time()
            total_time = '%.3f' % (stop - start)
            msg = ('{} has taken {}s'.format(func.__name__, total_time))
            print(msg)
            return result
        return wrapper

@timeit
def _requests_retry(url, method, **kwargs):
    """Method for request retry"""
    retries = Retry(total=5, backoff_factor=1)
    s = requests.Session()
    s.mount("http://", HTTPAdapter(max_retries=retries))
    response = None
    if method in ["GET"]:
        kwargs["headers"] = {"Content-Type": "application/json"}
        response = s.request(method=method, url=url, **kwargs)
    return response


if __name__ == "__main__":
    for i in range(5):
        res = _requests_retry("localhost:5000", "GET")
        if res is None:
            print("Err")
