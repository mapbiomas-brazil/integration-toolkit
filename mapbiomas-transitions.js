/**
 * 
 */
var assetInput = 'projects/mapbiomas-workspace/COLECAO5/mapbiomas-collection50-integration-v8';
var assetOutput = 'projects/mapbiomas-workspace/COLECAO5/mapbiomas-collection50-transitions-v2';
var assetGrids = 'projects/mapbiomas-workspace/AUXILIAR/cartas';

var periods = [
    // Consecutive years
    ["1985", "1986"],
    ["1986", "1987"],
    ["1987", "1988"],
    ["1988", "1989"],
    ["1989", "1990"],
    ["1990", "1991"],
    ["1991", "1992"],
    ["1992", "1993"],
    ["1993", "1994"],
    ["1994", "1995"],
    ["1995", "1996"],
    ["1996", "1997"],
    ["1997", "1998"],
    ["1998", "1999"],
    ["1999", "2000"],
    ["2000", "2001"],
    ["2001", "2002"],
    ["2002", "2003"],
    ["2003", "2004"],
    ["2004", "2005"],
    ["2005", "2006"],
    ["2006", "2007"],
    ["2007", "2008"],
    ["2008", "2009"],
    ["2009", "2010"],
    ["2010", "2011"],
    ["2011", "2012"],
    ["2012", "2013"],
    ["2013", "2014"],
    ["2014", "2015"],
    ["2015", "2016"],
    ["2016", "2017"],
    ["2017", "2018"],
    ["2018", "2019"],
    // 5 years
    ["1985", "1990"],
    ["1990", "1995"],
    ["1995", "2000"],
    ["2000", "2005"],
    ["2005", "2010"],
    ["2010", "2015"],
    ["2015", "2019"],
    // 10 years
    ["1990", "2000"],
    ["2000", "2010"],
    ["2010", "2019"],
    // All collection
    ["1985", "2019"],
    // Forest Code cutting date
    ["2008", "2019"],
    // Forest Code year of aproval
    ["2012", "2019"],
    // Brazil GHG Emissions Inventory
    ["1994", "2002"],
    ["2002", "2010"],
    ["2010", "2016"],
    // Other
    ["1990", "2008"],
    ["1990", "2019"],
    ["2000", "2019"],
    ["2008", "2018"],
    ["1986", "2015"],
    ["2001", "2016"],
    ["1996", "2015"],
];

/**
 * 
 * @param {*} transitionImage 
 */
var getEdges = function (transitionImage) {

    var labeled = transitionImage.connectedPixelCount(100, true);

    // Compute the image gradient in the X and Y directions.
    var xyGrad = transitionImage.gradient();

    // Compute the magnitude of the gradient.
    var gradient = xyGrad.select('x').pow(2)
        .add(xyGrad.select('y').pow(2)).sqrt();

    var labeledEdge = gradient.gt(0).multiply(labeled.lte(30));

    return labeledEdge;
};

/**
 * 
 * @param {*} transitionImage 
 * @param {*} image1 
 * @param {*} image2 
 */
var filterEdges = function (transitionImage, image1, image2) {

    // Filter edges
    var edges = getEdges(transitionImage);

    image2 = image2.where(edges.eq(1), image1);

    transitionImage = getTransition(image1, image2);

    return transitionImage;
};

/**
 * 
 * @param {*} image1 
 * @param {*} image2 
 */
var getTransition = function (image1, image2) {

    return image1.multiply(100).add(image2).toInt16();

};

/**
 * 
 * @param {*} period 
 * @param {*} image1 
 * @param {*} image2 
 */
var getTransitionsImage = function (period, image1, image2) {

    period = ee.List(period);
    image1 = ee.Image(image1);
    image2 = ee.Image(image2);

    var transitionImage = getTransition(image1, image2);

    // Filter edges
    transitionImage = filterEdges(transitionImage, image1, image2);

    var bandName = ee.String('transition_t0_t1')
        .replace('t0', ee.String(period.get(0)))
        .replace('t1', ee.String(period.get(1)));

    transitionImage = transitionImage.rename(bandName);

    return transitionImage
        .copyProperties(image1, ['version', 'collection'])
        .set('cover_type', 'transition');
};

/**
 * script
 */
// get integrated images from asset
var integrated = ee.ImageCollection(assetInput).min();

// 
var bandName = ee.String('classification_');

var transitions = ee.List(periods).iterate(
    function (period, transitions) {

        var image1 = integrated.select([bandName.cat(ee.String(ee.List(period).get(0)))]);
        var image2 = integrated.select([bandName.cat(ee.String(ee.List(period).get(1)))]);

        var transitionsPeriod = getTransitionsImage(
            period, image1, image2
        );

        return ee.Image(transitions).addBands(transitionsPeriod);
    },
    ee.Image().select()
);

transitions = ee.Image(transitions);

var grids = ee.FeatureCollection(assetGrids);

var gridNames = [
    "NA-19", "NA-20", "NA-21", "NA-22", "NB-20", "NB-21", "NB-22", "SA-19",
    "SA-20", "SA-21", "SA-22", "SA-23", "SA-24", "SB-18", "SB-19", "SB-20",
    "SB-21", "SB-22", "SB-23", "SB-24", "SB-25", "SC-18", "SC-19", "SC-20",
    "SC-21", "SC-22", "SC-23", "SC-24", "SC-25", "SD-20", "SD-21", "SD-22",
    "SD-23", "SD-24", "SE-20", "SE-21", "SE-22", "SE-23", "SE-24", "SF-21",
    "SF-22", "SF-23", "SF-24", "SG-21", "SG-22", "SG-23", "SH-21", "SH-22",
    "SI-22"
];

gridNames.forEach(
    function (gridName) {
        var grid = grids.filter(ee.Filter.stringContains('grid_name', gridName));

        Export.image.toAsset({
            'image': transitions,
            'description': gridName,
            'assetId': assetOutput + '/' + gridName,
            'pyramidingPolicy': {
                ".default": "mode"
            },
            'region': grid.geometry().buffer(300).bounds(),
            'scale': 30,
            'maxPixels': 1e13
        });
    }
);
