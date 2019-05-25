export default function getNormalizedOptions(options, optionsMapFn) {
    return options.map(option => ({
        id: option.id,
        ...optionsMapFn(option),
    }));
}
