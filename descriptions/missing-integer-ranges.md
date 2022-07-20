You are given a sorted list of distinct integers from 0 to 99, for instance [0, 1, 2, 50, 52, 75].
Your task is to produce a string that describes numbers missing from the list; in this case "3-49,51,53-74,76-99".
The items should be sorted in ascending order and separated by commas.
When a gap spans only one number, the item is the number itself;
when a gap is longer, the item comprises the start and the end of the gap, joined with a minus sign.
