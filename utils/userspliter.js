function nameSplitter(username = '') {
    let name = username.split(" ");
    return name.join("_");
}

module.exports = nameSplitter;