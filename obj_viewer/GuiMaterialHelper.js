System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GuiMaterialHelper;
    return {
        setters:[],
        execute: function() {
            GuiMaterialHelper = (function () {
                function GuiMaterialHelper() {
                }
                GuiMaterialHelper.addColor = function (gui, obj, property) {
                    if (obj[property] instanceof THREE.Color) {
                        var wrapper = { '__origin': obj, '__property': property };
                        Object.defineProperty(wrapper, property, {
                            get: function () {
                                return '#' + obj[property].getHexString();
                            },
                            set: function (val) {
                                obj[property].set(val);
                            }
                        });
                        gui.addColor(wrapper, property);
                    }
                    else {
                        gui.addColor(obj, property);
                    }
                };
                GuiMaterialHelper.updateTexture = function (material, materialKey, textures) {
                    return function (key) {
                        material[materialKey] = textures[key];
                        material.needsUpdate = true;
                    };
                };
                GuiMaterialHelper.removeFolder = function (folder, parent) {
                    folder.close();
                    console.log('close');
                    console.log(parent.__ul);
                    parent.__ul.removeChild(folder.domElement.parentNode);
                    console.log('removeChilde');
                    delete parent.__folders[folder.name];
                    parent.onResize();
                    console.log('onResize');
                };
                GuiMaterialHelper.guiMaterial = function (gui, material) {
                    var folder = gui.addFolder('THREE.Material');
                    folder.add(material, 'transparent');
                    folder.add(material, 'opacity', 0, 1);
                    // folder.add( material, 'blending', constants.blendingMode );
                    // folder.add( material, 'blendSrc', constants.destinationFactors );
                    // folder.add( material, 'blendDst', constants.destinationFactors );
                    // folder.add( material, 'blendEquation', constants.equations );
                    folder.add(material, 'depthTest');
                    folder.add(material, 'depthWrite');
                    // folder.add( material, 'polygonOffset' );
                    // folder.add( material, 'polygonOffsetFactor' );
                    // folder.add( material, 'polygonOffsetUnits' );
                    folder.add(material, 'alphaTest', 0, 1);
                    // folder.add( material, 'overdraw', 0, 5 );
                    folder.add(material, 'visible');
                };
                GuiMaterialHelper.guiMeshBasicMaterial = function (gui, material) {
                    var folder = gui.addFolder('THREE.MeshBasicMaterial');
                    GuiMaterialHelper.addColor(folder, material, 'color');
                    folder.add(material, 'wireframe');
                    folder.add(material, 'wireframeLinewidth', 0, 10);
                    folder.add(material, 'shading', GuiMaterialHelper.constants.shading);
                    // folder.add( material, 'vertexColors', constants.colors).onChange( needsUpdate( material, geometry ) );
                    folder.add(material, 'fog');
                    // folder.add( data, 'envMaps', envMapKeys ).onChange( updateTexture( material, 'envMap', envMaps ) );
                    // folder.add( data, 'map', textureMapKeys ).onChange( updateTexture( material, 'map', textureMaps ) );
                    // folder.add( data, 'specularMap', textureMapKeys ).onChange( updateTexture( material, 'specularMap', textureMaps ) );
                    // folder.add( data, 'alphaMap', textureMapKeys ).onChange( updateTexture( material, 'alphaMap', textureMaps ) );
                    // folder.add( material, 'morphTargets' ).onChange( updateMorphs( mesh, material ) );
                    // folder.add( material, 'combine', constants.combine ).onChange( updateMorphs( mesh, material ) );
                    folder.add(material, 'reflectivity', 0, 1);
                    folder.add(material, 'refractionRatio', 0, 1);
                    //folder.add( material, 'skinning' );
                };
                GuiMaterialHelper.guiMeshDepthMaterial = function (gui, material) {
                    var folder = gui.addFolder('THREE.MeshDepthMaterial');
                    folder.add(material, 'wireframe');
                    folder.add(material, 'wireframeLinewidth', 0, 10);
                    // folder.add( material, 'morphTargets' ).onChange( updateMorphs( mesh, material ) );
                };
                GuiMaterialHelper.guiMeshNormalMaterial = function (gui, material) {
                    var folder = gui.addFolder('THREE.MeshNormalMaterial');
                    folder.add(material, 'wireframe');
                    folder.add(material, 'wireframeLinewidth', 0, 10);
                    // folder.add( material, 'morphTargets' ).onChange( updateMorphs( mesh, material ) );
                };
                GuiMaterialHelper.guiLineBasicMaterial = function (gui, material) {
                    var folder = gui.addFolder('THREE.LineBasicMaterial');
                    GuiMaterialHelper.addColor(folder, material, 'color');
                    folder.add(material, 'linewidth', 0, 10);
                    folder.add(material, 'linecap', ["butt", "round", "square"]);
                    folder.add(material, 'linejoin', ["round", "bevel", "miter"]);
                    // folder.add( material, 'vertexColors', constants.colors).onChange( needsUpdate( material, geometry ) );
                    folder.add(material, 'fog');
                };
                GuiMaterialHelper.guiMeshLambertMaterial = function (gui, material) {
                    var folder = gui.addFolder('THREE.MeshLambertMaterial');
                    GuiMaterialHelper.addColor(folder, material, 'color');
                    GuiMaterialHelper.addColor(folder, material, 'emissive');
                    folder.add(material, 'wireframe');
                    folder.add(material, 'wireframeLinewidth', 0, 10);
                    // folder.add( material, 'vertexColors', constants.colors ).onChange( needsUpdate( material, geometry ) );
                    folder.add(material, 'fog');
                    // folder.add( data, 'envMaps', envMapKeys ).onChange( updateTexture( material, 'envMap', envMaps ) );
                    // folder.add( data, 'map', textureMapKeys ).onChange( updateTexture( material, 'map', textureMaps ) );
                    // folder.add( data, 'specularMap', textureMapKeys ).onChange( updateTexture( material, 'specularMap', textureMaps ) );
                    // folder.add( data, 'alphaMap', textureMapKeys ).onChange( updateTexture( material, 'alphaMap', textureMaps ) );
                    // folder.add( material, 'morphTargets' ).onChange( updateMorphs( mesh, material ) );
                    // folder.add( material, 'combine', constants.combine ).onChange( updateMorphs( mesh, material ) );
                    folder.add(material, 'reflectivity', 0, 1);
                    folder.add(material, 'refractionRatio', 0, 1);
                    //folder.add( material, 'skinning' );
                };
                GuiMaterialHelper.guiMeshPhongMaterial = function (gui, material) {
                    var folder = gui.addFolder('THREE.MeshPhongMaterial');
                    GuiMaterialHelper.addColor(folder, material, 'color');
                    GuiMaterialHelper.addColor(folder, material, 'emissive');
                    GuiMaterialHelper.addColor(folder, material, 'specular');
                    folder.add(material, 'shininess', 0, 100);
                    // folder.add( material, 'shading', constants.shading).onChange( needsUpdate( material, geometry ) );
                    folder.add(material, 'wireframe');
                    folder.add(material, 'wireframeLinewidth', 0, 10);
                    folder.add(material, 'vertexColors', GuiMaterialHelper.constants.colors);
                    folder.add(material, 'fog');
                    // folder.add( data, 'envMaps', envMapKeys ).onChange( updateTexture( material, 'envMap', envMaps ) );
                    // folder.add( data, 'map', textureMapKeys ).onChange( updateTexture( material, 'map', textureMaps ) );
                    // folder.add( data, 'lightMap', textureMapKeys ).onChange( updateTexture( material, 'lightMap', textureMaps ) );
                    // folder.add( data, 'specularMap', textureMapKeys ).onChange( updateTexture( material, 'specularMap', textureMaps ) );
                    // folder.add( data, 'alphaMap', textureMapKeys ).onChange( updateTexture( material, 'alphaMap', textureMaps ) );
                };
                GuiMaterialHelper.guiMeshStandardMaterial = function (gui, material) {
                    var folder = gui.addFolder('THREE.MeshStandardMaterial');
                    GuiMaterialHelper.addColor(folder, material, 'color');
                    GuiMaterialHelper.addColor(folder, material, 'emissive');
                    folder.add(material, 'roughness', 0, 1);
                    folder.add(material, 'metalness', 0, 1);
                    // folder.add( material, 'shading', constants.shading).onChange( needsUpdate( material, geometry ) );
                    folder.add(material, 'wireframe');
                    folder.add(material, 'wireframeLinewidth', 0, 10);
                    folder.add(material, 'vertexColors', GuiMaterialHelper.constants.colors);
                    folder.add(material, 'fog');
                    // folder.add( data, 'envMaps', envMapKeys ).onChange( updateTexture( material, 'envMap', envMaps ) );
                    // folder.add( data, 'map', textureMapKeys ).onChange( updateTexture( material, 'map', textureMaps ) );
                    // folder.add( data, 'lightMap', textureMapKeys ).onChange( updateTexture( material, 'lightMap', textureMaps ) );
                    // folder.add( data, 'alphaMap', textureMapKeys ).onChange( updateTexture( material, 'alphaMap', textureMaps ) );
                    // TODO roughnessMap and metalnessMap
                };
                GuiMaterialHelper.fillMaterialFolder = function (folder, m) {
                    if (m instanceof THREE.Material) {
                        GuiMaterialHelper.guiMaterial(folder, m);
                    }
                    if (m instanceof THREE.MeshBasicMaterial) {
                        GuiMaterialHelper.guiMeshBasicMaterial(folder, m);
                    }
                    if (m instanceof THREE.MeshLambertMaterial) {
                        GuiMaterialHelper.guiMeshLambertMaterial(folder, m);
                    }
                    if (m instanceof THREE.MeshPhongMaterial) {
                        GuiMaterialHelper.guiMeshPhongMaterial(folder, m);
                    }
                    if (m instanceof THREE.MeshStandardMaterial) {
                        GuiMaterialHelper.guiMeshStandardMaterial(folder, m);
                    }
                    if (m instanceof THREE.MeshDepthMaterial) {
                        GuiMaterialHelper.guiMeshDepthMaterial(folder, m);
                    }
                    if (m instanceof THREE.MeshNormalMaterial) {
                        GuiMaterialHelper.guiMeshNormalMaterial(folder, m);
                    }
                    if (m instanceof THREE.LineBasicMaterial) {
                        GuiMaterialHelper.guiLineBasicMaterial(folder, m);
                    }
                };
                GuiMaterialHelper.constants = {
                    combine: {
                        "THREE.MultiplyOperation": THREE.MultiplyOperation,
                        "THREE.MixOperation": THREE.MixOperation,
                        "THREE.AddOperation": THREE.AddOperation
                    },
                    side: {
                        "THREE.FrontSide": THREE.FrontSide,
                        "THREE.BackSide": THREE.BackSide,
                        "THREE.DoubleSide": THREE.DoubleSide
                    },
                    shading: {
                        "THREE.FlatShading": THREE.FlatShading,
                        "THREE.SmoothShading": THREE.SmoothShading
                    },
                    colors: {
                        "THREE.NoColors": THREE.NoColors,
                        "THREE.FaceColors": THREE.FaceColors,
                        "THREE.VertexColors": THREE.VertexColors
                    },
                    blendingMode: {
                        "THREE.NoBlending": THREE.NoBlending,
                        "THREE.NormalBlending": THREE.NormalBlending,
                        "THREE.AdditiveBlending": THREE.AdditiveBlending,
                        "THREE.SubtractiveBlending": THREE.SubtractiveBlending,
                        "THREE.MultiplyBlending": THREE.MultiplyBlending,
                        "THREE.CustomBlending": THREE.CustomBlending
                    },
                    equations: {
                        "THREE.AddEquation": THREE.AddEquation,
                        "THREE.SubtractEquation": THREE.SubtractEquation,
                        "THREE.ReverseSubtractEquation": THREE.ReverseSubtractEquation
                    },
                    destinationFactors: {
                        "THREE.ZeroFactor": THREE.ZeroFactor,
                        "THREE.OneFactor": THREE.OneFactor,
                        "THREE.SrcColorFactor": THREE.SrcColorFactor,
                        "THREE.OneMinusSrcColorFactor": THREE.OneMinusSrcColorFactor,
                        "THREE.SrcAlphaFactor": THREE.SrcAlphaFactor,
                        "THREE.OneMinusSrcAlphaFactor": THREE.OneMinusSrcAlphaFactor,
                        "THREE.DstAlphaFactor": THREE.DstAlphaFactor,
                        "THREE.OneMinusDstAlphaFactor": THREE.OneMinusDstAlphaFactor
                    },
                    sourceFactors: {
                        "THREE.DstColorFactor": THREE.DstColorFactor,
                        "THREE.OneMinusDstColorFactor": THREE.OneMinusDstColorFactor,
                        "THREE.SrcAlphaSaturateFactor": THREE.SrcAlphaSaturateFactor
                    }
                };
                return GuiMaterialHelper;
            }());
            exports_1("GuiMaterialHelper", GuiMaterialHelper);
        }
    }
});
//# sourceMappingURL=GuiMaterialHelper.js.map