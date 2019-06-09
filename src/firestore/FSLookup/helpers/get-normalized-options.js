export default function getNormalizedOptions(options, optionsMapFn) {
    return options.map(option => ({
        ...optionsMapFn(option),
        ...option,
    }));
}
