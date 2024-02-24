/**
* Core Greeting.
*/

export function makeGreeting(name: string): string {
    return "Hello, " + name + "!";
};


export function formatHtml(greeting: string): string {
    return `\
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wing Greeting Service</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="flex items-center justify-center h-screen">
    <div class"text-center" id="greeting">
        <h1 class="text-2xl font-bold">${greeting}</h1>
    </div>
</body>
</html>
`;
};
