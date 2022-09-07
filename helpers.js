module.exports = {
    PLANETS: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    getRoute: function(pricelist, startName, endName, search = 'shortest', myRoute = []) {
        if (!pricelist?.legs) return [];
        const legs = pricelist.legs;
        // get all routes that start with current planet
        // avoid routes we have already visited
        // get route info
        const nextRoutes = legs
            .filter(next => next.routeInfo.from.name == startName)
            .filter(next => !myRoute.includes(next))
            //.map(next => next.routeInfo);
        // find if any route ends with our planet, then add it and return
        const finalRoute = nextRoutes.find(next => next.routeInfo.to.name == endName);
        if (finalRoute) {
            myRoute.push(finalRoute);
            //console.log(`Possible route ${myRoute[0].routeInfo.from.name} to ${endName}: `, myRoute);
            return myRoute;
        }
        let solution;
        // get all next stops, use it as starting point, add to routes so far
        for (const next of nextRoutes) {
            // find if we can use this stop to find our destionation
            const possibleRoute = this.getRoute(pricelist, next.routeInfo.to.name, endName, search, myRoute.concat(next));
            // if we don't have shortest route or the route is shorter than a previous route, use this solution 
            // or use routeInfo.distance
            // or use providers cheapest price
    
            if (possibleRoute && !solution) solution = possibleRoute;
    
            if (search === 'shortest' && possibleRoute?.length < solution?.length) {
                solution = possibleRoute;
            } else if (possibleRoute?.length > solution?.length) {
                solution = possibleRoute;
            }
    
        }
        // return the shortest solution
        return solution;
    }
}