from pathlib import Path

inputs_dir = Path(__file__).parent.parent.joinpath("input")
input_group_end_marker = "#end"


def read_prepared_input(file_path):
    path = Path(file_path)
    inp_path = inputs_dir.joinpath(path.name[: -len(path.suffix)])

    lines = []
    with open(inp_path, "r") as file:
        group = []
        for line in file:
            line = line.strip()
            if line == input_group_end_marker:
                lines += [group]
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
        if group:
            lines += [group]
            group = []

    return lines


def expect(file, solver, expectation):
    i = 0
    for input in read_prepared_input(file):
        try:
            ans = solver(input)
            if ans == expectation[i]:
                prefix = "[OK]"
                msg = ""
            else:
                prefix = "[ERR]"
                msg = f"\n    {ans} != {expectation[i]}"
        except Exception as error:
            prefix = "[ERR]"
            msg = f"\n    {error}"

        print(f"{prefix} {input} {msg}")

        i = i + 1
