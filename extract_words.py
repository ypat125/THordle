with open("./words_alpha.txt") as file:
    lines = file.readlines()
    results = []

    for line in lines:
        if len(line) == 6:
            results.append(line)

    textfile = open("wordle_words.txt", "w")
    for element in results:
        textfile.write('"{}",\n'.format(element.rstrip()))
    textfile.close()
