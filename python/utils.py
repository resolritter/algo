from pathlib import Path

import sys
import re

number_matcher = re.compile(r"^[0-9.]+$")

inputs_dir = Path(__file__).parent.parent.joinpath("inputs")
answers_dir = Path(__file__).parent.parent.joinpath("answers")


def read_groups(input_source, *, group_lines=True):
    groups = []

    with open(input_source, "r") as lines:
        group = []
        for line in lines:
            line = line.rstrip("\n")
            if group_lines:
                if line == "#end":
                    groups += [group]
                    group = []
                else:
                    if number_matcher.match(line):
                        if "." in line:
                            group += [float(line)]
                        else:
                            group += [int(line)]
                    else:
                        group += [line]
            else:
                groups += [line]
        if group:
            groups += [group]
            group = []

    return groups


def read_prepared_input(module_path):
    path = Path(module_path)
    input_source = inputs_dir.joinpath(path.name[: -len(path.suffix)])
    return read_groups(input_source)


def read_prepared_answer(module_path, *, group_answers=False):
    path = Path(module_path)
    input_source = answers_dir.joinpath(path.name[: -len(path.suffix)])
    return read_groups(input_source, group_lines=group_answers)


def run(module_path, solver, inputs=None, answers=None, *, group_answers=False):
    if not inputs:
        if len(sys.argv) > 1:
            inputs = read_groups(sys.argv[2])
        else:
            try:
                inputs = read_groups("/dev/stdin")
            except:
                inputs = read_prepared_input(module_path)

    answers = answers or read_prepared_answer(module_path, group_answers=group_answers)

    for i in range(0, len(inputs)):
        input = inputs[i]
        try:
            ans = solver(input)
            expectation = answers[i]
            if str(ans) == answers[i]:
                prefix = "[OK]"
                msg = ""
            else:
                prefix = "[ERR]"
                msg = f"\n    {ans} != {expectation}"
        except Exception as error:
            prefix = "[ERR]"
            msg = f"\n    {error}"

        print(f"{prefix} {input} {msg}")

        i = i + 1
