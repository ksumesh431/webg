module.exports = {
    home: (req, res) => {
        res.write("Welcome!");
        res.send();
        res.end()
    },
    warmup: (req, res) => {
        res.write("Warmed up!!");
        res.send();
        res.end()
    }
}