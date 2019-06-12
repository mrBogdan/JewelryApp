export function sqlHadler(str: string): string {
    const escapeCharacters = [
        /\\/,
        /'/,
        /"/,
    ];

    let escapedStr = '';
    let added = false;

    for (let i = 0; i < str.length; ++ i) {
        for (let j = 0; j < escapeCharacters.length; ++ j) {
            if (escapeCharacters[j].test(str[i])) {
                escapedStr += `\\${str[i]}`;
                added = true;
            }
        }

        if (!added) {
            escapedStr += str[i];
        }

        added = false;
    }

    return escapedStr;
}