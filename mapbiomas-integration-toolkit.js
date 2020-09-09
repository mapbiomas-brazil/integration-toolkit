/**
 * @name
 *      MapBiomas Integration Toolkit
 * 
 * @description
 *  
 * @author
 *      João Siqueira
 *      joaovsiqueira1@gmail.com
 *
 * @version
 *  1.0.0
 *  1.0.6
 *  1.1.0 - Atualização das regras de prevalência da integração
 *  1.2.0 - Atualização das regras de prevalência da integração para a coleção 4.0
 *  1.3.0 - Atualização das regras de prevalência da integração para a coleção 4.1
 *  1.3.1 - Atualização dos dados da Amazônia, Cerrado e Mata Atlântica para integração da coleção 4.1
 *  1.4.0 - Atualização dos dados da coleção 5.0
 *  1.4.1 - Otimização do filtro espacial
 *  1.5.0 - Atualização da regra de integração da mata atlântica
 *  1.6.0 - Otimização do tempo de exportação
 *
 */
var outputAsset = 'projects/mapbiomas-workspace/COLECAO5/mapbiomas-collection50-integration-v8';

// import modules
// var palette = require('users/mapbiomas/modules:Palettes.js').get('classification5');
var palette = [
    '#ffffff', // [00]      0. Ausência de dados
    '#129912', // [01]      1. Floresta
    '#1f4423', // [02]    1.1. Floresta Natural
    '#006400', // [03]  1.1.1. Formação Florestal
    '#00ff00', // [04]  1.1.2. Formação Savânica
    '#687537', // [05]  1.1.3. Mangue
    '#76a5af', // [06]-
    '#29eee4', // [07]-
    '#77a605', // [08]-
    '#935132', // [09]    1.2. Floresta Plantada
    '#bbfcac', // [10]      2. Formação Natural não Florestal
    '#45c2a5', // [11]    2.1. Área Úmida Natural não Florestal
    '#b8af4f', // [12]    2.2. Formação Campestre
    '#f1c232', // [13]    2.5. Outra Formação não Florestal
    '#ffffb2', // [14]      3. Agropecuária
    '#ffd966', // [15]    3.1. Pastagem
    '#f6b26b', // [16]-
    '#f99f40', // [17]-
    '#e974ed', // [18]    3.2. Agricultura
    '#d5a6bd', // [19]  3.2.1. Lavoura Temporária
    '#c27ba0', // [20]3.2.1.2. Cana
    '#fff3bf', // [21]    3.3. Mosaico de Agricultura ou Pastagem
    '#ea9999', // [22]      4. Área não Vegetada
    '#dd7e6b', // [23]    4.3. Praia e Duna
    '#aa0000', // [24]    4.1. Infraestrutura Urbana
    '#ff0000', // [25]    4.4. Outra Área não Vegetada
    '#0000ff', // [26]      5. Corpo D'água
    '#d5d5e5', // [27]      6. Não Observado
    '#dd497f', // [28]-
    '#b2ae7c', // [29]    2.4. Afloramento Rochoso
    '#af2a2a', // [30]    4.2. Mineração
    '#8a2be2', // [31]  5.2.3. Aquicultura
    '#968c46', // [32]    2.3. Apicum
    '#0000ff', // [33]    5.1. Corpo dágua Natura
    '#4fd3ff', // [34]    5.3. Glaciais
    '#645617', // [35]-
    '#f3b4f1', // [36]  3.2.3. Lavoura Perene
    '#02106f', // [37]    5.2. Corpo dágua Artificial
    '#02106f', // [38]  5.2.1. Reservatórios
    '#c59ff4', // [39]3.2.1.1. Soja
    '#ba87f8', // [40]3.2.1.3. Arroz
    '#e787f8', // [41]3.2.1.4. Outros
    '#cca0d4', // [42]3.2.2.1. Café
    '#d082de', // [43]3.2.2.1. Citrus
    '#cd49e4', // [44]3.2.2.1. Caju
    '#e04cfa', // [45]3.2.2.1. Outros
];

var App = {

    options: {
        // app version
        version: '1.5.0',

        // assets versions
        versions: {
            // biomes
            amz: '5',
            caa: '5',
            cer: '2',
            mat: '7',
            pam: '4',
            pan: '4',
            // transversais
            agr: '3',
            min: '5',
            pec: '1',
            urb: '7',
            fpt: '4',
            znc: '2',
            fld: '1',
            wat: '1',
        },

        assets: {
            // ancilary data
            biomes: 'projects/mapbiomas-workspace/AUXILIAR/biomas-raster-41',
            mosaic: 'projects/mapbiomas-workspace/MOSAICOS/workspace-c3',
            classification: 'projects/mapbiomas-workspace/COLECAO5/classificacao',
            collection41: 'projects/mapbiomas-workspace/public/collection4_1/mapbiomas_collection41_integration_v1',
            collection50: 'projects/mapbiomas-workspace/COLECAO5/mapbiomas-collection50-integration-v7',
            collection31: 'projects/mapbiomas-workspace/public/collection3_1/mapbiomas_collection31_integration_v1',
            ucs: 'projects/mapbiomas-workspace/AUXILIAR/unidades-de-conservacao-raster',

            // transversal data
            agriculture: 'projects/mapbiomas-workspace/TRANSVERSAIS/AGRICULTURA5-FT',
            plantedForest: 'projects/mapbiomas-workspace/TRANSVERSAIS/FLORESTAPLANTADA5-FT',
            pasture: 'projects/mapbiomas-workspace/TRANSVERSAIS/PECUARIA5-FT',
            coastalZone: 'projects/mapbiomas-workspace/TRANSVERSAIS/ZONACOSTEIRA5-FT',
            mining: 'projects/mapbiomas-workspace/TRANSVERSAIS/MINERACAO5-FT',
            urbanArea: 'projects/mapbiomas-workspace/TRANSVERSAIS/INFRAURBANA5-FT',
            flood: 'projects/mapbiomas-workspace/TRANSVERSAIS/FLOOD5-FT',
            water: 'projects/mapbiomas-workspace/TRANSVERSAIS/AGUA5-FT',

            // vector data
            cartas: 'projects/mapbiomas-workspace/AUXILIAR/cartas',
            regionsVector: 'projects/mapbiomas-workspace/AUXILIAR/biomas-2019',
        },

        ids: {
            amz: 1,
            caa: 5,
            cer: 4,
            mat: 2,
            pam: 6,
            pan: 3,
        },

        prefix: {
            amz: '/AMAZONIA-',
            caa: '/CAATINGA-',
            cer: '/CERRADO-',
            mat: '/MATAATLANTICA-',
            pam: '/PAMPA-',
            pan: '/PANTANAL-'
        },

        year: '2019',

        layers: [],

        classification: null,
        integration: null,
        mosaics: null,
        regions: null,
        collection50: null,
        collection31: null,

        vis: {
            'integration': {
                'min': 0,
                'max': 45,
                'palette': palette,
                'format': 'png'
            },

            'mosaic': {
                'bands': ['median_swir1', 'median_nir', 'median_red'],
                'gain': [0.08, 0.06, 0.2],
                'gamma': 0.65
            },

            'pasture': {},
            'agriculture': {},
            'plantedForest': {},
            'urbanArea': {},
            'coastalZone': {},

            'vectors': {
                color: 'ff0000',
                fillColor: '00000000',
                width: 2
            }
        },

        'prevalenceList': []

    },

    init: function () {

        App.ui.init();
        App.loadImages();
        App.ui.startLayers();

        // Map.setCenter(-53.48144, -11.43695, 5);
    },

    setVersion: function () {

        App.ui.form.labelTitle.setValue('MapBiomas Integration Toolkit ' + App.options.version);

    },

    getPrevalenceList: function () {

        var prevalenceList = [
            {
                'prevalence_id': 1,
                'label': 'Mineração',
                'rule': {
                    'class_input': 30,
                    'class_output': 30,
                    'source': App.options.assets.mining + '/' + App.options.year + '-' + App.options.versions.min
                },
                'exception': null
            },
            {
                'prevalence_id': 2,
                'label': 'Praias e Dunas',
                'rule': {
                    'class_input': 23,
                    'class_output': 23,
                    'source': App.options.assets.coastalZone + '/' + App.options.year + '-' + App.options.versions.znc
                },
                'exception': null
            },
            {
                'prevalence_id': 3,
                'label': 'Praias e Dunas',
                'rule': {
                    'class_input': 23,
                    'class_output': 23,
                    'source': App.options.classification
                },
                'exception': null
            },
            {
                'prevalence_id': 4,
                'label': 'Mangue',
                'rule': {
                    'class_input': 5,
                    'class_output': 5,
                    'source': App.options.assets.coastalZone + '/' + App.options.year + '-' + App.options.versions.znc
                },
                'exception': null
            },
            {
                'prevalence_id': 5,
                'label': 'Aquicultura',
                'rule': {
                    'class_input': 31,
                    'class_output': 31,
                    'source': App.options.assets.coastalZone + '/' + App.options.year + '-' + App.options.versions.znc
                },
                'exception': null
            },
            {
                'prevalence_id': 6,
                'label': 'Apicum',
                'rule': {
                    'class_input': 32,
                    'class_output': 32,
                    'source': App.options.assets.coastalZone + '/' + App.options.year + '-' + App.options.versions.znc
                },
                'exception': null
            },
            {
                'prevalence_id': 7,
                'label': 'Infraestrutura Urbana',
                'rule': {
                    'class_input': 24,
                    'class_output': 24,
                    'source': App.options.assets.urbanArea + '/' + App.options.year + '-' + App.options.versions.urb
                },
                'exception': null
            },
            {
                'prevalence_id': 8,
                'label': 'Floresta Plantada',
                'rule': {
                    'class_input': 9,
                    'class_output': 9,
                    'source': App.options.assets.plantedForest + '/' + App.options.year + '-' + App.options.versions.fpt
                },
                'exception': null
                // 'exception': {
                //     'rule': [{
                //         'class_input': [App.options.ids.amz],
                //         'source': App.options.assets.biomes
                //     },
                //         {
                //             'class_input': [33],
                //             'source': App.options.assets.water + '/' + App.options.year + '-' + App.options.versions.wat
                //         }
                //     ],
                //     'class_output': 33
                // }
            },
            {
                'prevalence_id': 9,
                'label': 'Floresta plantada (biomas)',
                'rule': {
                    'class_input': 9,
                    'class_output': 9,
                    'source': App.options.classification
                },
                'exception': null
            },
            {
                'prevalence_id': 10,
                'label': 'Cana',
                'rule': {
                    'class_input': 20,
                    'class_output': 20,
                    'source': App.options.assets.agriculture + '/' + App.options.year + '-' + App.options.versions.agr
                },
                'exception': null
            },
            {
                'prevalence_id': 11,
                'label': 'Soja',
                'rule': {
                    'class_input': 39,
                    'class_output': 39,
                    'source': App.options.assets.agriculture + '/' + App.options.year + '-' + App.options.versions.agr
                },
                'exception': null
            },
            {
                'prevalence_id': 12,
                'label': 'Outros (Agricultura)',
                'rule': {
                    'class_input': 41,
                    'class_output': 41,
                    'source': App.options.assets.agriculture + '/' + App.options.year + '-' + App.options.versions.agr
                },
                'exception': null
            },
            {
                'prevalence_id': 13,
                'label': 'Lavoura Perene',
                'rule': {
                    'class_input': 36,
                    'class_output': 36,
                    'source': App.options.assets.agriculture + '/' + App.options.year + '-' + App.options.versions.agr
                },
                'exception': null
            },
            {
                'prevalence_id': 14,
                'label': 'Lavoura Temporária',
                'rule': {
                    'class_input': 19,
                    'class_output': 19,
                    'source': App.options.assets.agriculture + '/' + App.options.year + '-' + App.options.versions.agr
                },
                'exception': null
            },
            {
                'prevalence_id': 15,
                'label': 'Lavoura temporaria (biomas)',
                'rule': {
                    'class_input': 19, // TODO: revisar esses ids
                    'class_output': 41,
                    'source': App.options.classification
                },
                'exception': {
                    'rule': [{
                        'class_input': [App.options.ids.amz],
                        'source': App.options.assets.biomes
                    },
                    {
                        'class_input': [15],
                        'source': App.options.assets.pasture + '/' + App.options.year + '-' + App.options.versions.pec
                    }
                    ],
                    'class_output': 15
                }
            },
            {
                'prevalence_id': 16,
                'label': 'Afloramento Rochoso',
                'rule': {
                    'class_input': 29,
                    'class_output': 29,
                    'source': App.options.classification
                },
                'exception': null
            },
            {
                'prevalence_id': 17,
                'label': 'Outras Áreas não Vegetadas',
                'rule': {
                    'class_input': 25,
                    'class_output': 25,
                    'source': App.options.classification
                },
                'exception': null
            },
            {
                'prevalence_id': 18,
                'label': 'Área não Vegetada',
                'rule': {
                    'class_input': 22,
                    'class_output': 25,
                    'source': App.options.classification
                },
                'exception': {
                    'rule': [{
                        'class_input': [15],
                        'source': App.options.assets.pasture + '/' + App.options.year + '-' + App.options.versions.pec
                    },
                    {
                        'class_input': [
                            App.options.ids.amz,
                            App.options.ids.caa,
                            App.options.ids.cer,
                            App.options.ids.mat,
                            App.options.ids.pan,
                            // App.options.ids.pam, // exceto pampa?
                        ],
                        'source': App.options.assets.biomes
                    }
                    ],
                    'class_output': 15
                }
            },
            {
                'prevalence_id': 19,
                'label': 'Rios, Lagos e Oceanos (biomes)',
                'rule': {
                    'class_input': 33,
                    'class_output': 33,
                    'source': App.options.classification
                },
                'exception': null
            },
            // {
            //     'prevalence_id': 19,
            //     'label': 'Rios, Lagos e Oceanos (biomes)',
            //     'rule': {
            //         'class_input': 1, // TODO: ajustar o valor da classe no asset
            //         'class_output': 33,
            //         'source': App.options.assets.water + '/' + App.options.year + '-' + App.options.versions.wat
            //     },
            //     'exception': null
            // },
            {
                'prevalence_id': 20,
                'label': 'Formação Florestal',
                'rule': {
                    'class_input': 3,
                    'class_output': 3,
                    'source': App.options.classification
                },
                'exception': {
                    'rule': [{
                        'class_input': [App.options.ids.amz, App.options.ids.cer],
                        'source': App.options.assets.biomes
                    },
                    // Pastagem sobre floresta na Amazônia e Cerrado
                    {
                        'class_input': [15],
                        'source': App.options.assets.pasture + '/' + App.options.year + '-' + App.options.versions.pec
                    }
                    ],
                    'class_output': 15
                },
            },
            {
                'prevalence_id': 21,
                'label': 'Formação Savânica',
                'rule': {
                    'class_input': 4,
                    'class_output': 4,
                    'source': App.options.classification
                },
                'exception': {
                    'rule': [{
                        'class_input': [App.options.ids.amz, App.options.ids.cer, App.options.ids.mat],
                        'source': App.options.assets.biomes
                    },
                    {
                        'class_input': [15],
                        'source': App.options.assets.pasture + '/' + App.options.year + '-' + App.options.versions.pec
                    }
                    ],
                    'class_output': 15
                },
            },
            {
                'prevalence_id': 22,
                'label': '  Área Úmida Natural não Florestal',
                // Dado classificado pelos biomas
                'rule': {
                    'class_input': 11,
                    'class_output': 11,
                    'source': App.options.classification
                },
                'exception': null
            },
            {
                'prevalence_id': 23,
                'label': 'Formação Campestre',
                'rule': {
                    'class_input': 12,
                    'class_output': 12,
                    'source': App.options.classification
                },
                // 
                'exception': {
                    'rule': [{
                        'class_input': [App.options.ids.cer],
                        'source': App.options.assets.biomes
                    },
                    {
                        'class_input': [0],
                        'source': ee.Image(App.options.assets.ucs).unmask()
                    },
                    {
                        'class_input': [15],
                        'source': App.options.assets.pasture + '/' + App.options.year + '-' + App.options.versions.pec
                    }
                    ],
                    'class_output': 15
                }
            },
            {
                'prevalence_id': 24,
                'label': 'Formação Natural não Florestal',
                'rule': {
                    'class_input': 13,
                    'class_output': 13,
                    'source': App.options.classification
                },
                'exception': {
                    'rule': [{
                        'class_input': [App.options.ids.mat],
                        'source': App.options.assets.biomes
                    },
                    {
                        'class_input': [15],
                        'source': App.options.assets.pasture + '/' + App.options.year + '-' + App.options.versions.pec
                    }
                    ],
                    'class_output': 15
                }
            },
            {
                'prevalence_id': 25,
                'label': 'Pastagem',
                'rule': {
                    'class_input': 15,
                    'class_output': 15,
                    'source': App.options.assets.pasture + '/' + App.options.year + '-' + App.options.versions.pec
                },
                'exception': {
                    'rule': [{
                        'class_input': [
                            App.options.ids.pam,
                        ],
                        'source': App.options.assets.biomes
                    },
                    {
                        'class_input': [0, 15, 21], // No pampa o que sobrou da classe 15 e 21 vira 41
                        'source': App.options.classification
                    }
                    ],
                    'class_output': 41
                }
            },
            {
                'prevalence_id': 26,
                'label': 'Pastagem',
                'rule': {
                    'class_input': 15,
                    'class_output': 15,
                    'source': App.options.classification
                },
                'exception': null
            },
            {
                'prevalence_id': 27,
                'label': 'Mosaico de Agricultura e Pastagem',
                'rule': {
                    'class_input': 21,
                    'class_output': 21,
                    'source': App.options.classification
                },
                'exception': {
                    'rule': [{
                        'class_input': [
                            App.options.ids.pam
                        ],
                        'source': App.options.assets.biomes
                    },
                    ],
                    'class_output': 41
                }
            },
            {
                'prevalence_id': 28,
                'label': 'Lavoura perene (biomas)',
                'rule': {
                    'class_input': 19,
                    'class_output': 41,
                    'source': App.options.classification
                },
                'exception': null
            },
        ];

        return prevalenceList;
    },

    getClassifications: function () {

        var amz = ee.Image([App.options.assets.classification, App.options.prefix.amz, App.options.year, '-', App.options.versions.amz].join(''));
        var caa = ee.Image([App.options.assets.classification, App.options.prefix.caa, App.options.year, '-', App.options.versions.caa].join(''));
        var cer = ee.Image([App.options.assets.classification, App.options.prefix.cer, App.options.year, '-', App.options.versions.cer].join(''));
        var mat = ee.Image([App.options.assets.classification, App.options.prefix.mat, App.options.year, '-', App.options.versions.mat].join(''));
        var pam = ee.Image([App.options.assets.classification, App.options.prefix.pam, App.options.year, '-', App.options.versions.pam].join(''));
        var pan = ee.Image([App.options.assets.classification, App.options.prefix.pan, App.options.year, '-', App.options.versions.pan].join(''));

        var image = ee.ImageCollection.fromImages([
            amz.mask(App.options.regions.eq(App.options.ids.amz)).rename('classification'),
            caa.mask(App.options.regions.eq(App.options.ids.caa)).rename('classification'),
            cer.mask(App.options.regions.eq(App.options.ids.cer)).rename('classification'),
            mat.mask(App.options.regions.eq(App.options.ids.mat)).rename('classification'),
            pam.mask(App.options.regions.eq(App.options.ids.pam)).rename('classification'),
            pan.mask(App.options.regions.eq(App.options.ids.pan)).rename('classification'),
        ]).min();

        return image;
    },

    getMosaics: function () {

        var filterByYear = ee.Filter.eq('year', parseInt(App.options.year, 10));

        var collection = ee.ImageCollection(App.options.assets.mosaic)
            .filter(filterByYear);

        var amz = collection
            .filterMetadata('biome', 'equals', 'AMAZONIA')
            .mosaic();

        var caa = collection
            .filterMetadata('biome', 'equals', 'CAATINGA')
            .mosaic();

        var cer = collection
            .filterMetadata('biome', 'equals', 'CERRADO')
            .mosaic();

        var mat = collection
            .filterMetadata('biome', 'equals', 'MATAATLANTICA')
            .mosaic();

        var pam = collection
            .filterMetadata('biome', 'equals', 'PAMPA')
            .mosaic();

        var pan = collection
            .filterMetadata('biome', 'equals', 'PANTANAL')
            .mosaic();

        var image = ee.ImageCollection.fromImages([
            amz.mask(App.options.regions.eq(App.options.ids.amz)),
            caa.mask(App.options.regions.eq(App.options.ids.caa)),
            cer.mask(App.options.regions.eq(App.options.ids.cer)),
            mat.mask(App.options.regions.eq(App.options.ids.mat)),
            pam.mask(App.options.regions.eq(App.options.ids.pam)),
            pan.mask(App.options.regions.eq(App.options.ids.pan)),
        ]).mosaic();

        return image;
    },

    getRegions: function () {

        var regions = ee.Image(App.options.assets.biomes);

        return regions;
    },

    getCollections: function () {

        App.options.collection41 = ee.Image(App.options.assets.collection41)
            .select('classification_' + App.options.year);

        App.options.collection50 = ee.ImageCollection(App.options.assets.collection50)
            .select('classification_' + App.options.year);

        App.options.collection31 = ee.Image(App.options.assets.collection31)
            .addBands(ee.Image(0).rename('classification_2018'))
            .select('classification_' + App.options.year);
    },

    loadImages: function () {

        App.options.regions = App.getRegions();

        App.options.classification = App.getClassifications();

        App.options.mosaics = App.getMosaics();

        App.options.prevalenceList = App.getPrevalenceList();

        App.options.integrated = App.integrate(App.options.year);

        // loads collection 3.1 and collection 4.1
        App.getCollections();

        App.options.layers = [
            App.options.mosaics,
            App.options.classification,
            App.options.integrated,
            ee.FeatureCollection(App.options.assets.cartas).style(App.options.vis.vectors),
            ee.FeatureCollection(App.options.assets.regionsVector).style(App.options.vis.vectors),
            ee.Image(App.options.assets.coastalZone + '/' + App.options.year + '-' + App.options.versions.znc).selfMask(),
            ee.Image(App.options.assets.mining + '/' + App.options.year + '-' + App.options.versions.min).selfMask(),
            ee.Image(App.options.assets.agriculture + '/' + App.options.year + '-' + App.options.versions.agr).selfMask(),
            ee.Image(App.options.assets.pasture + '/' + App.options.year + '-' + App.options.versions.pec).selfMask(),
            ee.Image(App.options.assets.plantedForest + '/' + App.options.year + '-' + App.options.versions.fpt).selfMask(),
            ee.Image(App.options.assets.urbanArea + '/' + App.options.year + '-' + App.options.versions.urb).selfMask(),
            ee.Image(App.options.assets.coastalZone + '/' + App.options.year + '-' + App.options.versions.znc).selfMask(),
            App.options.collection50,
            App.options.collection31,
            App.options.collection41,
            ee.Image(App.options.assets.water + '/' + App.options.year + '-' + App.options.versions.wat).selfMask(),
        ];
    },

    integrate: function (year) {

        App.options.year = String(year);

        App.options.classification = App.getClassifications();

        App.options.prevalenceList = App.getPrevalenceList();

        App.options.integrated = App.recursion(
            ee.Image(0),
            // App.options.classification,
            App.options.prevalenceList,
            App.options.prevalenceList.filter(App.filterByPrevalence, {
                'id': App.options.prevalenceList.length
            })
        );

        return App.options.integrated.mask(App.options.regions.neq(0))
            .rename('classification_' + App.options.year);

    },

    filterByPrevalence: function (obj) {

        return obj.prevalence_id == this.id;

    },

    applyRule: function (image, obj) {

        var mask = ee.Image(obj.rule.source)
            .unmask()
            .eq(obj.rule.class_input);

        var integrated = image
            .where(mask.eq(1), obj.rule.class_output);

        if (obj.exception !== null) {

            var maskExceptionList = obj.exception.rule.map(
                function (item) {

                    return ee.Image(item.source)
                        .unmask()
                        .remap(item.class_input, ee.List.repeat(1, item.class_input.length), 0)
                        .rename(['mask']);
                }
            );

            var maskException = ee.ImageCollection.fromImages(maskExceptionList)
                .reduce(ee.Reducer.product())
                .multiply(mask);

            integrated = integrated
                .where(maskException.eq(1), obj.exception.class_output);
        }

        return integrated;
    },

    recursion: function (image, prevalenceList, obj) {

        var integrated;

        obj = obj[0];

        integrated = App.applyRule(image, obj);

        if (obj.prevalence_id > 1) {

            integrated = App.recursion(
                integrated,
                prevalenceList,
                prevalenceList.filter(App.filterByPrevalence, {
                    'id': obj.prevalence_id - 1
                })
            );

        }

        return integrated;
    },

    ui: {

        init: function () {

            this.form.init();

        },

        startLayers: function () {

            var imageLayer1 = ui.Map.Layer({
                'eeObject': App.options.layers[0],
                'visParams': App.options.vis.mosaic,
                'name': 'Mosaics ' + App.options.year,
                'shown': true,
                'opacity': 1.0
            });

            var imageLayer2 = ui.Map.Layer({
                'eeObject': App.options.layers[1],
                'visParams': App.options.vis.integration,
                'name': 'Classification-FT ' + App.options.year,
                'shown': false,
                'opacity': 1.0
            });

            var imageLayer3 = ui.Map.Layer({
                'eeObject': App.options.layers[2].add(App.options.layers[2].eq(0).multiply(3)),
                'visParams': App.options.vis.integration,
                'name': 'Integration ' + App.options.year,
                'shown': false,
                'opacity': 1.0
            });

            Map.add(imageLayer1);
            Map.add(imageLayer2);
            Map.add(imageLayer3);

        },

        clear: function () {

            App.ui.removeImageLayer('Agriculture Annual' + App.options.year);
            App.ui.removeImageLayer('Agriculture Semiperene' + App.options.year);
            App.ui.removeImageLayer('Pasture ' + App.options.year);
            App.ui.removeImageLayer('Planted Forest ' + App.options.year);
            App.ui.removeImageLayer('Urban Area ' + App.options.year);
            App.ui.removeImageLayer('Coastal Zone ' + App.options.year);
            App.ui.removeImageLayer('Mining ' + App.options.year);
            App.ui.removeImageLayer('Apicum ' + App.options.year);
            App.ui.removeImageLayer('Water ' + App.options.year);
            App.ui.removeImageLayer('Mosaics ' + App.options.year);
            App.ui.removeImageLayer('Classification-FT ' + App.options.year);
            App.ui.removeImageLayer('Integration ' + App.options.year);
            App.ui.removeImageLayer('Biomes');
            App.ui.removeImageLayer('Grids 1:1,000,000');
            App.ui.removeImageLayer('Coleção 4.0 ' + App.options.year);
            App.ui.removeImageLayer('Coleção 4.1 ' + App.options.year);
            App.ui.removeImageLayer('Coleção 3.1 ' + App.options.year);

            App.ui.form.checkboxApicum.setValue(false);
            App.ui.form.checkboxMining.setValue(false);
            App.ui.form.checkboxAgriculture.setValue(false);
            App.ui.form.checkboxPasture.setValue(false);
            App.ui.form.checkboxPlantedForest.setValue(false);
            App.ui.form.checkboxUrbanArea.setValue(false);
            App.ui.form.checkboxCoastalZone.setValue(false);
            App.ui.form.checkboxWater.setValue(false);
            App.ui.form.checkboxBiomes.setValue(false);
            App.ui.form.checkboxCartas.setValue(false);
            App.ui.form.checkboxCollection41.setValue(false);
            App.ui.form.checkboxCollection50.setValue(false);
            App.ui.form.checkboxCollection31.setValue(false);

        },

        addImageLayer: function (index, label, vis) {

            var image = App.options.layers[index - 1];

            var imageLayer = ui.Map.Layer({
                'eeObject': image,
                'visParams': vis,
                'name': label,
                'shown': true,
                'opacity': 1.0
            });

            Map.add(imageLayer);

        },

        removeImageLayer: function (label) {

            for (var i = 0; i < Map.layers().length(); i++) {

                var layer = Map.layers().get(i);

                if (label === layer.get('name')) {
                    Map.remove(layer);
                }
            }

        },

        manageLayers: function (checked, index, label, vis) {

            if (checked) {
                App.ui.addImageLayer(index, label, vis);
            } else {
                App.ui.removeImageLayer(label);
            }

        },

        form: {

            init: function () {

                this.panelMain.add(this.labelTitle);

                this.panelMain.add(this.selectYear0);

                this.panelMain.add(this.labelLayers);

                this.panelLayersList.add(this.checkboxCollection31);
                this.panelLayersList.add(this.checkboxCollection50);
                this.panelLayersList.add(this.checkboxCollection41);
                this.panelLayersList.add(this.checkboxCartas);
                this.panelLayersList.add(this.checkboxBiomes);
                this.panelLayersList.add(this.checkboxApicum);
                this.panelLayersList.add(this.checkboxMining);
                this.panelLayersList.add(this.checkboxAgriculture);
                this.panelLayersList.add(this.checkboxPasture);
                this.panelLayersList.add(this.checkboxPlantedForest);
                this.panelLayersList.add(this.checkboxUrbanArea);
                this.panelLayersList.add(this.checkboxCoastalZone);
                this.panelLayersList.add(this.checkboxWater);

                this.panelMain.add(this.panelLayersList);

                Map.add(this.panelMain);
            },

            panelMain: ui.Panel({
                'layout': ui.Panel.Layout.flow('vertical'),
                'style': {
                    'width': '250px',
                    'position': 'bottom-left',
                    'margin': '0px 0px 0px 0px',
                },
            }),

            panelLayersList: ui.Panel({
                'layout': ui.Panel.Layout.flow('vertical'),
                'style': {
                    // 'height': '270px',
                    'stretch': 'vertical',
                    'backgroundColor': '#cccccc',
                },
            }),

            labelTitle: ui.Label('MapBiomas Integration Toolkit', {
                'fontWeight': 'bold',
                // 'padding': '1px',
                'fontSize': '16px'
            }),

            labelLayers: ui.Label('Layers:', {
                // 'padding': '1px',
                'fontSize': '16px'
            }),

            selectYear0: ui.Select({
                'items': [
                    '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992',
                    '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000',
                    '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008',
                    '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016',
                    '2017', '2018', '2019'
                ],
                'placeholder': 'select year',
                'value': '2019',
                'onChange': function (year) {

                    App.ui.clear();

                    App.options.year = year;

                    App.loadImages();
                    App.ui.startLayers();

                },
                'style': {
                    'stretch': 'horizontal'
                }
            }),

            checkboxCartas: ui.Checkbox({
                "label": 'Grids 1:1,000,000',
                "value": false,
                "onChange": function (checked) {

                    App.ui.manageLayers(checked, 4, 'Grids 1:1,000,000', { format: 'png' });

                },
                "disabled": false,
                "style": {
                    'padding': '2px',
                    'stretch': 'horizontal',
                    'backgroundColor': '#dddddd',
                    'fontSize': '12px'
                }
            }),

            checkboxBiomes: ui.Checkbox({
                "label": 'Biomes',
                "value": false,
                "onChange": function (checked) {

                    App.ui.manageLayers(checked, 5, 'Biomes', { format: 'png' });

                },
                "disabled": false,
                "style": {
                    'padding': '2px',
                    'stretch': 'horizontal',
                    'backgroundColor': '#dddddd',
                    'fontSize': '12px'
                }
            }),

            checkboxApicum: ui.Checkbox({
                "label": 'Apicum',
                "value": false,
                "onChange": function (checked) {

                    App.ui.manageLayers(checked, 6, 'Apicum ' + App.options.year, App.options.vis.integration);

                },
                "disabled": true,
                "style": {
                    'padding': '2px',
                    'stretch': 'horizontal',
                    'backgroundColor': '#dddddd',
                    'fontSize': '12px'
                }
            }),

            checkboxMining: ui.Checkbox({
                "label": 'Mining',
                "value": false,
                "onChange": function (checked) {

                    App.ui.manageLayers(checked, 7, 'Mining ' + App.options.year, App.options.vis.integration);

                },
                "disabled": false,
                "style": {
                    'padding': '2px',
                    'stretch': 'horizontal',
                    'backgroundColor': '#dddddd',
                    'fontSize': '12px'
                }
            }),

            checkboxAgriculture: ui.Checkbox({
                "label": 'Agriculture',
                "value": false,
                "onChange": function (checked) {

                    App.ui.manageLayers(checked, 8, 'Agriculture ' + App.options.year, App.options.vis.integration);

                },
                "disabled": false,
                "style": {
                    'padding': '2px',
                    'stretch': 'horizontal',
                    'backgroundColor': '#dddddd',
                    'fontSize': '12px'
                }
            }),

            checkboxPasture: ui.Checkbox({
                "label": 'Pasture',
                "value": false,
                "onChange": function (checked) {

                    App.ui.manageLayers(checked, 9, 'Pasture ' + App.options.year, App.options.vis.integration);

                },
                "disabled": false,
                "style": {
                    'padding': '2px',
                    'stretch': 'horizontal',
                    'backgroundColor': '#dddddd',
                    'fontSize': '12px'
                }
            }),

            checkboxPlantedForest: ui.Checkbox({
                "label": 'Planted Forest',
                "value": false,
                "onChange": function (checked) {

                    App.ui.manageLayers(checked, 10, 'Planted Forest ' + App.options.year, App.options.vis.integration);

                },
                "disabled": false,
                "style": {
                    'padding': '2px',
                    'stretch': 'horizontal',
                    'backgroundColor': '#dddddd',
                    'fontSize': '12px'
                }
            }),

            checkboxUrbanArea: ui.Checkbox({
                "label": 'Urban Area',
                "value": false,
                "onChange": function (checked) {

                    App.ui.manageLayers(checked, 11, 'Urban Area ' + App.options.year, App.options.vis.integration);

                },
                "disabled": false,
                "style": {
                    'padding': '2px',
                    'stretch': 'horizontal',
                    'backgroundColor': '#dddddd',
                    'fontSize': '12px'
                }
            }),

            checkboxCoastalZone: ui.Checkbox({
                "label": 'Coastal Zone',
                "value": false,
                "onChange": function (checked) {

                    App.ui.manageLayers(checked, 12, 'Coastal Zone ' + App.options.year, App.options.vis.integration);

                },
                "disabled": false,
                "style": {
                    'padding': '2px',
                    'stretch': 'horizontal',
                    'backgroundColor': '#dddddd',
                    'fontSize': '12px'
                }
            }),

            checkboxWater: ui.Checkbox({
                "label": 'Water',
                "value": false,
                "onChange": function (checked) {

                    App.ui.manageLayers(checked, 16, 'Water ' + App.options.year, App.options.vis.integration);

                },
                "disabled": false,
                "style": {
                    'padding': '2px',
                    'stretch': 'horizontal',
                    'backgroundColor': '#dddddd',
                    'fontSize': '12px'
                }
            }),

            checkboxCollection50: ui.Checkbox({
                "label": 'Coleção 5.0',
                "value": false,
                "onChange": function (checked) {

                    App.ui.manageLayers(checked, 13, 'Coleção 5.0 ' + App.options.year, App.options.vis.integration);

                },
                "disabled": false,
                "style": {
                    'padding': '2px',
                    'stretch': 'horizontal',
                    'backgroundColor': '#dddddd',
                    'fontSize': '12px'
                }
            }),

            checkboxCollection31: ui.Checkbox({
                "label": 'Coleção 3.1',
                "value": false,
                "onChange": function (checked) {

                    App.ui.manageLayers(checked, 14, 'Coleção 3.1 ' + App.options.year, App.options.vis.integration);

                },
                "disabled": false,
                "style": {
                    'padding': '2px',
                    'stretch': 'horizontal',
                    'backgroundColor': '#dddddd',
                    'fontSize': '12px'
                }
            }),

            checkboxCollection41: ui.Checkbox({
                "label": 'Coleção 4.1',
                "value": false,
                "onChange": function (checked) {

                    App.ui.manageLayers(checked, 15, 'Coleção 4.1 ' + App.options.year, App.options.vis.integration);

                },
                "disabled": false,
                "style": {
                    'padding': '2px',
                    'stretch': 'horizontal',
                    'backgroundColor': '#dddddd',
                    'fontSize': '12px'
                }
            }),

        },
    }
};

/**
* 
*/
var filterParams = [
    {
        'classValue': 1,
        'maxSize': 5
    },
    {
        'classValue': 2,
        'maxSize': 5
    },
    {
        'classValue': 3,
        'maxSize': 5
    },
    {
        'classValue': 4,
        'maxSize': 5
    },
    {
        'classValue': 5,
        'maxSize': 5
    },
    {
        'classValue': 6,
        'maxSize': 5
    },
    {
        'classValue': 7,
        'maxSize': 5
    },
    {
        'classValue': 8,
        'maxSize': 5
    },
    {
        'classValue': 9,
        'maxSize': 5
    },
    {
        'classValue': 10,
        'maxSize': 5
    },
    {
        'classValue': 11,
        'maxSize': 5
    },
    {
        'classValue': 12,
        'maxSize': 5
    },
    {
        'classValue': 13,
        'maxSize': 5
    },
    {
        'classValue': 14,
        'maxSize': 5
    },
    {
        'classValue': 15,
        'maxSize': 5
    },
    {
        'classValue': 16,
        'maxSize': 5
    },
    {
        'classValue': 17,
        'maxSize': 5
    },
    {
        'classValue': 18,
        'maxSize': 5
    },
    {
        'classValue': 19,
        'maxSize': 5
    },
    {
        'classValue': 20,
        'maxSize': 5
    },
    {
        'classValue': 21,
        'maxSize': 5
    },
    {
        'classValue': 22,
        'maxSize': 5
    },
    {
        'classValue': 23,
        'maxSize': 5
    },
    {
        'classValue': 24,
        'maxSize': 5
    },
    {
        'classValue': 25,
        'maxSize': 5
    },
    {
        'classValue': 26,
        'maxSize': 5
    },
    {
        'classValue': 27,
        'maxSize': 5
    },
    {
        'classValue': 28,
        'maxSize': 5
    },
    {
        'classValue': 29,
        'maxSize': 5
    },
    {
        'classValue': 30,
        'maxSize': 5
    },
    {
        'classValue': 31,
        'maxSize': 5
    },
    {
        'classValue': 32,
        'maxSize': 5
    },
    {
        'classValue': 33,
        'maxSize': 5
    },
    {
        'classValue': 36,
        'maxSize': 5
    },
    {
        'classValue': 37,
        'maxSize': 5
    },
    {
        'classValue': 38,
        'maxSize': 5
    },
    {
        'classValue': 39,
        'maxSize': 5
    },
    {
        'classValue': 40,
        'maxSize': 5
    },
    {
        'classValue': 41,
        'maxSize': 5
    },
    {
        'classValue': 42,
        'maxSize': 5
    },
    {
        'classValue': 43,
        'maxSize': 5
    },
    {
        'classValue': 44,
        'maxSize': 5
    },
    {
        'classValue': 45,
        'maxSize': 5
    },

];


/**
 * Classe de pos-classificação para reduzir ruídos na imagem classificada
 * 
 * @param {ee.Image} image [eeObjeto imagem de classificação]
 *
 * @example
 * var image = ee.Image("aqui vem a sua imagem");
 * var filterParams = [
 *     {classValue: 1, maxSize: 3},
 *     {classValue: 2, maxSize: 5}, // o tamanho maximo que o mapbiomas está usado é 5
 *     {classValue: 3, maxSize: 5}, // este valor foi definido em reunião
 *     {classValue: 4, maxSize: 3},
 *     ];
 * var pc = new PostClassification(image);
 * var filtered = pc.spatialFilter(filterParams);
 */
var PostClassification = function (image) {

    this.init = function (image) {

        this.image = image;

    };

    var majorityFilter = function (image, params) {

        params = ee.Dictionary(params);
        var maxSize = ee.Number(params.get('maxSize'));
        var classValue = ee.Number(params.get('classValue'));

        // Generate a mask from the class value
        var classMask = image.eq(classValue);

        // Labeling the group of pixels until 100 pixels connected
        var labeled = classMask.mask(classMask).connectedPixelCount(maxSize, true);

        // Select some groups of connected pixels
        var region = labeled.lt(maxSize);

        // Squared kernel with size shift 1
        // [[p(x-1,y+1), p(x,y+1), p(x+1,y+1)]
        // [ p(x-1,  y), p( x,y ), p(x+1,  y)]
        // [ p(x-1,y-1), p(x,y-1), p(x+1,y-1)]
        var kernel = ee.Kernel.square(1);

        // Find neighborhood
        var neighs = image.neighborhoodToBands(kernel).mask(region);

        // Reduce to majority pixel in neighborhood
        var majority = neighs.reduce(ee.Reducer.mode());

        // Replace original values for new values
        var filtered = image.where(region, majority);

        return filtered.byte();

    };

    /**
     * Método para reclassificar grupos de pixels de mesma classe agrupados
     * @param  {list<dictionary>} filterParams [{classValue: 1, maxSize: 3},{classValue: 2, maxSize: 5}]
     * @return {ee.Image}  Imagem classificada filtrada
     */
    this.spatialFilter = function (filterParams) {

        var image = ee.List(filterParams)
            .iterate(
                function (params, image) {
                    return majorityFilter(ee.Image(image), params);
                },
                this.image
            );

        this.image = ee.Image(image);


        return this.image;

    };

    this.init(image);

};

//=============================================================================
// Script
//=============================================================================

var years = [
    1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992,
    1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
    2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
    2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
    2017, 2018, 2019
];

// integration
App.init();

var Legend = require('users/joaovsiqueira1/packages:Legend.js');

var params = {
    "title": 'Legend',
    "layers": [
        ['#ffffff', 0, '0. Ausência de dados'],
        // ['#129912', 1, '1. Floresta'],
        // ['#1f4423', 2, '1.1. Floresta Natural'],
        ['#006400', 3, '1.1.1. Formação Florestal'],
        ['#00ff00', 4, '1.1.2. Formação Savânica'],
        ['#687537', 5, '1.1.3. Mangue'],
        ['#935132', 9, '1.2. Floresta Plantada'],
        // ['#bbfcac', 10, '2. Formação Natural não Florestal'],
        ['#45c2a5', 11, '2.1. Área Úmida Natural não Florestal'],
        ['#b8af4f', 12, '2.2. Formação Campestre'],
        ['#f1c232', 13, '2.5. Outra Formação não Florestal'],
        // ['#ffffb2', 14, '3. Agropecuária'],
        ['#ffd966', 15, '3.1. Pastagem'],
        ['#e974ed', 18, '3.2. Agricultura'],
        ['#d5a6bd', 19, '3.2.1. Lavoura Temporária'],
        ['#c27ba0', 20, '3.2.1.2. Cana'],
        ['#fff3bf', 21, '3.3. Mosaico de Agricultura ou Pastagem'],
        // ['#ea9999', 22, '4. Área não Vegetada'],
        ['#dd7e6b', 23, '4.3. Praia e Duna'],
        ['#aa0000', 24, '4.1. Infraestrutura Urbana'],
        ['#ff0000', 25, '4.4. Outra Área não Vegetada'],
        // ['#0000ff', 26, '5. Corpo Dágua'],
        // ['#d5d5e5', 27, '6. Não Observado'],
        // ['#b2ae7c', 29, '2.4. Afloramento Rochoso'],
        ['#af2a2a', 30, '4.2. Mineração'],
        ['#8a2be2', 31, '5.2.3. Aquicultura'],
        ['#968c46', 32, '2.3. Apicum'],
        ['#0000ff', 33, '5.1. Corpo Dágua Natura'],
        // ['#4fd3ff', 34, '5.3. Glaciais'],
        ['#f3b4f1', 36, '3.2.3. Lavoura Perene'],
        // ['#02106f', 37, '5.2. Corpo Dágua Artificial'],
        // ['#02106f', 38, '5.2.1. Reservatórios'],
        ['#c59ff4', 39, '3.2.1.1. Soja'],
        // ['#ba87f8', 40, '3.2.1.3. Arroz'],
        ['#e787f8', 41, '3.2.1.4. Outros'],
        // ['#cca0d4', 42, '3.2.2.1. Café'],
        // ['#d082de', 43, '3.2.2.1. Citrus'],
        // ['#cd49e4', 44, '3.2.2.1. Caju'],
        // ['#e04cfa', 45, '3.2.2.1. Outros']
    ],
    "style": {
        "backgroundColor": "#ffffff",//"#212121",
        "color": "#212121"//"#ffffff"
    },
    "orientation": "vertical"
};

var legendPanel = ui.Panel({
    'layout': ui.Panel.Layout.flow('vertical'),
    'style': {
        'stretch': 'vertical',
        'position': 'bottom-right'
    },
});

legendPanel.add(Legend.getLegend(params));

Map.add(legendPanel);

var integratedList = ee.List(
    years.map(
        function (year) {
            var integ = App.integrate(year);

            var pc = new PostClassification(integ);

            integ = pc.spatialFilter(filterParams);

            return integ;
        }
    )
);

var integrated = ee.Image(
    integratedList.iterate(
        function (band, image) {
            return ee.Image(image).addBands(band);
        },
        ee.Image().select()
    )
);

/**
 * Export to asset
 */
var assetGrids = 'projects/mapbiomas-workspace/AUXILIAR/cartas';

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
            'image': integrated,
            'description': gridName,
            'assetId': outputAsset + '/' + gridName,
            'pyramidingPolicy': {
                ".default": "mode"
            },
            'region': grid.geometry().buffer(300).bounds(),
            'scale': 30,
            'maxPixels': 1e13
        });
    }
);
