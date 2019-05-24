import categoryRouter from './category.router'

export default (app) => {
    app.use('/categories', categoryRouter);

    return app
};
