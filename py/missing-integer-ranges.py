#!/usr/bin/env python

import utils


def solve(vs):
    h = {}
    for v in vs:
        h[v] = True

    buf = ""
    start = None
    end = None

    def collect():
        nonlocal start, end, buf
        if start == None:
            return
        if end:
            buf += f",{start}-{end}"
        else:
            buf += f",{start}"
        start = None
        end = None

    for i in range(0, 100):
        if i in h:
            collect()
            continue
        if start == None:
            start = i
        else:
            end = i
    if buf == "" and start == None and end == None and len(vs) == 0:
        start = 0
        end = 99
    collect()

    return buf[1:]


utils.run(__file__, solve)
