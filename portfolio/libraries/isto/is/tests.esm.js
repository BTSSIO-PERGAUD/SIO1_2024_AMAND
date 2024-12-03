import isBoolean from "isto/is/boolean";

const tests = [
    [true],
    [false],
    [true, {
        strict: true
    }],
    [false, {
        strict: true
    }],
    [1],
    [0],
    [1, {
        binary: true
    }],
    [0, {
        binary: true
    }]
    [1, {
        strict: true
    }],
    [0, {
        strict: true
    }],
    [1, {
        strict: true,
        binary: true
    }],
    [0, {
        strict: true,
        binary: true
    }],
    [123],
    [123, {
        strict: true
    }],
    [1337n],
    [1337n, {
        strict: true
    }],
    [null],
    [null, {
        strict: true
    }],
    [undefined],
    [undefined, {
        strict: true
    }],
    [{}],
    [{}, {
        strict: true
    }],
    [{
        test: "TESTA!"
    }],
    [{
        test: "TESTA!"
    }, {
        strict: true
    }],
    [[]],
    [[], {
        strict: true
    }],
    [[
        "TESTA!"
    ]],
    [[
        "TESTA!"
    ], {
        strict: true
    }],
    ["I'm a boolean 👨"],
    ["I'm not a boolean 🤖", {
        strict: false
    }],
    [1, {
        stringify: false
    }],
    [0, {
        stringify: false
    }],
    [1, {
        binary: true,
        stringify: false
    }],
    [0, {
        binary: true,
        stringify: false
    }]
    [1, {
        strict: true,
        stringify: false
    }],
    [0, {
        strict: true,
        stringify: false
    }],
    [1, {
        strict: true,
        binary: true,
        stringify: false
    }],
    [0, {
        strict: true,
        binary: true,
        stringify: false
    }],
    [123, {
        stringify: false
    }],
    [123, {
        strict: true,
        stringify: false
    }],
    [1337n, {
        stringify: false
    }],
    [1337n, {
        strict: true,
        stringify: false
    }],
    [null, {
        stringify: false
    }],
    [null, {
        strict: true,
        stringify: false
    }],
    [undefined, {
        stringify: false
    }],
    [undefined, {
        strict: true,
        stringify: false
    }],
    [{}, {
        stringify: false
    }],
    [{}, {
        strict: true,
        stringify: false
    }],
    [{
        test: "TESTA!"
    }, {
        stringify: false
    }],
    [{
        test: "TESTA!"
    }, {
        strict: true,
        stringify: false
    }],
    [[], {
        stringify: false
    }],
    [[], {
        strict: true,
        stringify: false
    }],
    [[
        "TESTA!"
    ], {
        stringify: false
    }],
    [[
        "TESTA!"
    ], {
        strict: true,
        stringify: false
    }],
    ["I'm a boolean 👨", {
        stringify: false
    }],
    ["I'm not a boolean 🤖", {
        strict: false,
        stringify: false
    }],
    ["true"],
    ["false"],
    ["true", {
        stringify: false
    }],
    ["false", {
        stringify: false
    }],
    ["true", {
        strict: true
    }],
    ["false", {
        strict: true
    }],
    ["true", {
        strict: true,
        stringify: false
    }],
    ["false", {
        strict: true,
        stringify: false
    }],
    ["1"],
    ["0"],
    ["1", {
        binary: true
    }],
    ["0", {
        binary: true
    }]
    ["1", {
        strict: true
    }],
    ["0", {
        strict: true
    }],
    ["1", {
        strict: true,
        binary: true
    }],
    ["0", {
        strict: true,
        binary: true
    }],
    ["123"],
    ["123", {
        strict: true
    }],
    ["1337n"],
    ["1337n", {
        strict: true
    }],
    ["null"],
    ["null", {
        strict: true
    }],
    ["undefined"],
    ["undefined", {
        strict: true
    }],
    ["{}"],
    ["{}", {
        strict: true
    }],
    ["{test:\"TESTA!\"}"],
    ["{test:\"TESTA!\"}", {
        strict: true
    }],
    ["[]"],
    ["[]", {
        strict: true
    }],
    ["[\"TESTA!\"]"],
    ["[\"TESTA!\"]", {
        strict: true
    }],
    [`"I'm a boolean 👨"`],
    [`"I'm not a boolean 🤖"`, {
        strict: false
    }],
    ["1", {
        stringify: false
    }],
    ["0", {
        stringify: false
    }],
    ["1", {
        binary: true,
        stringify: false
    }],
    ["0", {
        binary: true,
        stringify: false
    }]
    ["1", {
        strict: true,
        stringify: false
    }],
    ["0", {
        strict: true,
        stringify: false
    }],
    ["1", {
        strict: true,
        binary: true,
        stringify: false
    }],
    ["0", {
        strict: true,
        binary: true,
        stringify: false
    }],
    ["123", {
        stringify: false
    }],
    ["123", {
        strict: true,
        stringify: false
    }],
    ["1337n", {
        stringify: false
    }],
    ["1337n", {
        strict: true,
        stringify: false
    }],
    ["null", {
        stringify: false
    }],
    ["null", {
        strict: true,
        stringify: false
    }],
    ["undefined", {
        stringify: false
    }],
    ["undefined", {
        strict: true,
        stringify: false
    }],
    ["{}", {
        stringify: false
    }],
    ["{}", {
        strict: true,
        stringify: false
    }],
    ["{test:\"TESTA!\"}", {
        stringify: false
    }],
    ["{test:\"TESTA!\"}", {
        strict: true,
        stringify: false
    }],
    ["[]", {
        stringify: false
    }],
    ["[]", {
        strict: true,
        stringify: false
    }],
    ["[\"TESTA!\"]", {
        stringify: false
    }],
    ["[\"TESTA!\"]", {
        strict: true,
        stringify: false
    }],
    [`"I'm a boolean 👨"`, {
        stringify: false
    }],
    [`"I'm not a boolean 🤖"`, {
        strict: false,
        stringify: false
    }]
];

let results = {
    true: [],
    false: []
};

for (const test of tests) {
    (results[String(isBoolean(...test))]).push(test)
};

console.log("// Return true");
for (const [value, options] of results["true"])
{
    console.log(`isBoolean(${JSON.stringify(value)}${typeof (options) != "undefined" ? `, ${JSON.stringify(options, null, 4)}` : ""})`)
};
console.log("// Return false");
for (const [value, options] of results["false"])
{
    console.log(`isBoolean(${JSON.stringify(value)}${typeof (options) != "undefined" ? `, ${JSON.stringify(options, null, 4)}` : ""})`)
}