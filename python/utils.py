from pathlib import Path

import sys

inputs_dir = Path(__file__).parent.parent.joinpath("inputs")
answers_dir = Path(__file__).parent.parent.joinpath("answers")


def read_groups(input_source, *, interpret_lines=True):
    groups = []

    with open(input_source, "r") as lines:
        group = []
        for line in lines:
            line = line.rstrip("\n")
            if interpret_lines:
                if line == "#end":
                    groups += [group]
                    group = []
                else:
                    ascii = ord(line[0])
                    if ascii > 47 and ascii < 58:  # 0 to 9
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


def read_prepared_input(file_path, **kwargs):
    path = Path(file_path)
    input_source = inputs_dir.joinpath(path.name[: -len(path.suffix)])
    return read_groups(input_source, **kwargs)


def read_prepared_answer(file_path):
    path = Path(file_path)
    input_source = answers_dir.joinpath(path.name[: -len(path.suffix)])
    return read_groups(input_source, interpret_lines=False)


def run(file, solver, inputs=None, answers=None):
    if not inputs:
        if len(sys.argv) > 1:
            inputs = read_groups(sys.argv[2])
        else:
            try:
                inputs = read_groups("/dev/stdin")
            except:
                inputs = read_prepared_input(file)

    answers = answers or read_prepared_answer(file)

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
