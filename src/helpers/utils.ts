/* eslint-disable @typescript-eslint/no-explicit-any */
export function convertXmlToJson(xmlString: string) {
    const jsonData: any = {};
    for (const result of xmlString.matchAll(
        /(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm
    )) {
        const key = result[1] || result[3];
        const value = result[2] && convertXmlToJson(result[2]); //recursion
        jsonData[key] =
            (value && Object.keys(value).length ? value : result[2]) || null;
    }
    return jsonData;
}
