#!/usr/bin/env python

import utils

"""
You are given a sorted list of distinct integers from 0 to 99, for instance [0, 1, 2, 50, 52, 75].
Your task is to produce a string that describes numbers missing from the list; in this case "3-49,51,53-74,76-99".
The items should be sorted in ascending order and separated by commas.
When a gap spans only one number, the item is the number itself;
when a gap is longer, the item comprises the start and the end of the gap, joined with a minus sign.
"""


def solve(vs):
    h = {}
    for v in vs:
        h[v] = True

    buf = ""
    start = -1
    end = -1

    def collect():
        nonlocal start, end, buf
        if start == -1:
            return
        if end == -1:
            buf += f",{start}"
        else:
            buf += f",{start}-{end}"
        start = -1
        end = -1

    for i in range(0, 100):
        if i in h:
            collect()
            continue
        if start == -1:
            start = i
        else:
            end = i
    collect()

    return buf[1:]


utils.run(
    __file__,
    solve,
)
