const views = {
    form: ({ title, action, method, guitar }) => {
        const isEdit = Boolean(guitar);
        return views._layout(`
            <h2>${title}</h2>
            <form action="${action}" method="${method}">
                <div>
                    <label for="make">Make:</label>
                    <input type="text" id="make" name="make" value="${guitar ? guitar.make : ''}" required>
                </div>
                <div>
                    <label for="model">Model:</label>
                    <input type="text" id="model" name="model" value="${guitar ? guitar.model : ''}" required>
                </div>
                <button type="submit">${isEdit ? 'Update' : 'Create'} Guitar</button>
            </form>
        `);
    },
    list: ({guitars, title}) => {
        const liElements = guitars.map(({ id, make, model }) => 
            `<li><a href="/guitars/${id}">${make} ${model}</a></li>`); 

        return views._layout(`
            <h2>${title}</h2>
            <ul>
                ${liElements.join('')}
            </ul>
        `);
    },
    show: ({ guitar }) => {
        return views._layout(`
            <h2>${guitar.make} ${guitar.model}</h2>
            <p>ID: ${guitar.id}</p>
        `);
    }, 
    _layout: (content) => {
        return `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Guitar App</title>
                    <link rel="stylesheet" href="/css/style.css">
                </head>
                <body>
                    ${content}
                    <script src="/js/app.js"></script>
                </body>
            </html>
        `;
    }
};

export const view = (name, data) => {
    if (views[name]) {
        return views[name](data);
    }
};