export default function getValue(value) {
    const { selectedLabel, ...rest } = value;
    if (selectedLabel) {
        return {
            ...rest,
            label: selectedLabel,
        };
    }
    return value;
}
