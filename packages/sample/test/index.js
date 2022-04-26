function main() {
    const a = 1;
    const b = 2;
    let sum = a + b;
    const greeting = `Hi, this function is working. The sum of A + B is ${sum}`
    console.log(greeting);
    return {
        "body": greeting
    }
}