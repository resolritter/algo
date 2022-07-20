#!/usr/bin/env python

import utils


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
