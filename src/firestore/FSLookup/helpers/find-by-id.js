export default function findById(options = [], id) {
    let option;
    options.forEach(opt => {
        if (opt.id === id) {
            option = opt;
        }
    });
    return option;
}
