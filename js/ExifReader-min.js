// Generated by CoffeeScript 1.6.2
/*
# ExifReader 1.0.1
# http://github.com/mattiasw/exifreader
# Copyright (C) 2011-2013  Mattias Wallander <mattias@wallander.eu>
# Licensed under the GNU Lesser General Public License version 3 or later
# See license text at http://www.gnu.org/licenses/lgpl.txt
*/
(function(){("undefined"!==typeof exports&&null!==exports?exports:this).ExifReader=function(){function b(){var a=this;this._getTagValueAt={1:function(c){return a._getByteAt(c)},2:function(c){return a._getAsciiAt(c)},3:function(c){return a._getShortAt(c)},4:function(c){return a._getLongAt(c)},5:function(c){return a._getRationalAt(c)},7:function(c){return a._getUndefinedAt(c)},9:function(c){return a._getSlongAt(c)},10:function(c){return a._getSrationalAt(c)}};this._tiffHeaderOffset=0}b.prototype._MIN_DATA_BUFFER_LENGTH=
2;b.prototype._JPEG_ID_SIZE=2;b.prototype._JPEG_ID=65496;b.prototype._APP_MARKER_SIZE=2;b.prototype._APP0_MARKER=65504;b.prototype._APP1_MARKER=65505;b.prototype._APP15_MARKER=65519;b.prototype._APP_ID_OFFSET=4;b.prototype._BYTES_Exif=1165519206;b.prototype._TIFF_HEADER_OFFSET=10;b.prototype._BYTE_ORDER_BIG_ENDIAN=18761;b.prototype._BYTE_ORDER_LITTLE_ENDIAN=19789;b.prototype.load=function(a){return this.loadView(new DataView(a))};b.prototype.loadView=function(a){this._dataView=a;this._tags={};this._checkImageHeader();
return this._readTags()};b.prototype._checkImageHeader=function(){var a;a=this._dataView;if(a.byteLength<this._MIN_DATA_BUFFER_LENGTH||a.getUint16(0,!1)!==this._JPEG_ID)throw Error("Invalid image format");this._parseAppMarkers(a);if(!this._hasExifData())throw Error("No Exif data");};b.prototype._parseAppMarkers=function(a){var c,d,e;c=this._JPEG_ID_SIZE;for(e=[];!(a.byteLength<c+this._APP_ID_OFFSET+5);){if(this._isApp1ExifMarker(a,c))d=a.getUint16(c+this._APP_MARKER_SIZE,!1),this._tiffHeaderOffset=
c+this._TIFF_HEADER_OFFSET;else if(this._isAppMarker(a,c))d=a.getUint16(c+this._APP_MARKER_SIZE,!1);else break;e.push(c+=this._APP_MARKER_SIZE+d)}return e};b.prototype._isApp1ExifMarker=function(a,c){return a.getUint16(c,!1)===this._APP1_MARKER&&a.getUint32(c+this._APP_ID_OFFSET,!1)===this._BYTES_Exif&&0===a.getUint8(c+this._APP_ID_OFFSET+4,!1)};b.prototype._isAppMarker=function(a,c){var d;d=a.getUint16(c,!1);return d>=this._APP0_MARKER&&d<=this._APP15_MARKER};b.prototype._hasExifData=function(){return 0!==
this._tiffHeaderOffset};b.prototype._readTags=function(){this._setByteOrder();this._read0thIfd();this._readExifIfd();this._readGpsIfd();return this._readInteroperabilityIfd()};b.prototype._setByteOrder=function(){if(this._dataView.getUint16(this._tiffHeaderOffset)===this._BYTE_ORDER_BIG_ENDIAN)return this._littleEndian=!0;if(this._dataView.getUint16(this._tiffHeaderOffset)===this._BYTE_ORDER_LITTLE_ENDIAN)return this._littleEndian=!1;throw Error("Illegal byte order value. Faulty image.");};b.prototype._read0thIfd=
function(){var a;a=this._getIfdOffset();return this._readIfd("0th",a)};b.prototype._getIfdOffset=function(){return this._tiffHeaderOffset+this._getLongAt(this._tiffHeaderOffset+4)};b.prototype._readExifIfd=function(){var a;if(null!=this._tags["Exif IFD Pointer"])return a=this._tiffHeaderOffset+this._tags["Exif IFD Pointer"].value,this._readIfd("exif",a)};b.prototype._readGpsIfd=function(){var a;if(null!=this._tags["GPS Info IFD Pointer"])return a=this._tiffHeaderOffset+this._tags["GPS Info IFD Pointer"].value,
this._readIfd("gps",a)};b.prototype._readInteroperabilityIfd=function(){var a;if(null!=this._tags["Interoperability IFD Pointer"])return a=this._tiffHeaderOffset+this._tags["Interoperability IFD Pointer"].value,this._readIfd("interoperability",a)};b.prototype._readIfd=function(a,c){var d,e,b,g;d=this._getShortAt(c);c+=2;g=[];for(b=0;0<=d?b<d:b>d;0<=d?++b:--b)e=this._readTag(a,c),this._tags[e.name]={value:e.value,description:e.description},g.push(c+=12);return g};b.prototype._readTag=function(a,c){var d,
e,b,g;d=this._getShortAt(c);b=this._getShortAt(c+2);e=this._getLongAt(c+4);4>=this._typeSizes[b]*e?e=this._getTagValue(c+8,b,e):(g=this._getLongAt(c+8),e=this._getTagValue(this._tiffHeaderOffset+g,b,e));b===this._tagTypes.ASCII&&(e=this._splitNullSeparatedAsciiString(e));return null!=this._tagNames[a][d]?(null!=this._tagNames[a][d].name&&null!=this._tagNames[a][d].description?(b=this._tagNames[a][d].name,d=this._tagNames[a][d].description(e)):(b=this._tagNames[a][d],d=e instanceof Array?e.join(", "):
e),{name:b,value:e,description:d}):{name:"undefined-"+d,value:e,description:e}};b.prototype._getTagValue=function(a,c,d){var b,f,g;g=[];for(f=0;0<=d?f<d:f>d;0<=d?++f:--f)b=this._getTagValueAt[c](a),a+=this._typeSizes[c],g.push(b);a=g;1===a.length?a=a[0]:c===this._tagTypes.ASCII&&(a=this._getAsciiValue(a));return a};b.prototype._getAsciiValue=function(a){var c,d,b,f;f=[];d=0;for(b=a.length;d<b;d++)c=a[d],f.push(String.fromCharCode(c));return f};b.prototype._getByteAt=function(a){return this._dataView.getUint8(a)};
b.prototype._getAsciiAt=function(a){return this._dataView.getUint8(a)};b.prototype._getShortAt=function(a){return this._dataView.getUint16(a,this._littleEndian)};b.prototype._getLongAt=function(a){return this._dataView.getUint32(a,this._littleEndian)};b.prototype._getRationalAt=function(a){return this._getLongAt(a)/this._getLongAt(a+4)};b.prototype._getUndefinedAt=function(a){return this._getByteAt(a)};b.prototype._getSlongAt=function(a){return this._dataView.getInt32(a,this._littleEndian)};b.prototype._getSrationalAt=
function(a){return this._getSlongAt(a)/this._getSlongAt(a+4)};b.prototype._splitNullSeparatedAsciiString=function(a){var c,d,b,f,g;b=[];f=d=0;for(g=a.length;f<g;f++)c=a[f],"\x00"===c?d++:(null==b[d]&&(b[d]=""),b[d]+=c);return b};b.prototype._typeSizes={1:1,2:1,3:2,4:4,5:8,7:1,9:4,10:8};b.prototype._tagTypes={BYTE:1,ASCII:2,SHORT:3,LONG:4,RATIONAL:5,UNDEFINED:7,SLONG:9,SRATIONAL:10};b.prototype._tagNames={"0th":{256:"ImageWidth",257:"ImageLength",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",
270:"ImageDescription",271:"Make",272:"Model",273:"StripOffsets",274:{name:"Orientation",description:function(a){switch(a){case 1:return"top-left";case 2:return"top-right";case 3:return"bottom-right";case 4:return"bottom-left";case 5:return"left-top";case 6:return"right-top";case 7:return"right-bottom";case 8:return"left-bottom";default:return"Undefined"}}},277:"SamplesPerPixel",278:"RowsPerStrip",279:"StripByteCounts",282:"XResolution",283:"YResolution",284:"PlanarConfiguration",296:{name:"ResolutionUnit",
description:function(a){switch(a){case 2:return"inches";case 3:return"centimeters";default:return"Unknown"}}},301:"TransferFunction",305:"Software",306:"DateTime",315:"Artist",318:"WhitePoint",319:"PrimaryChromaticities",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",529:"YCbCrCoefficients",530:"YCbCrSubSampling",531:{name:"YCbCrPositioning",description:function(a){switch(a){case 1:return"centered";case 2:return"co-sited";default:return"undefied "+a}}},532:"ReferenceBlackWhite",33432:{name:"Copyright",
description:function(a){return a.join("; ")}},34665:"Exif IFD Pointer",34853:"GPS Info IFD Pointer"},exif:{33434:"ExposureTime",33437:"FNumber",34850:{name:"ExposureProgram",description:function(a){switch(a){case 0:return"Undefined";case 1:return"Manual";case 2:return"Normal program";case 3:return"Aperture priority";case 4:return"Shutter priority";case 5:return"Creative program";case 6:return"Action program";case 7:return"Portrait mode";case 8:return"Landscape mode";default:return"Unknown"}}},34852:"SpectralSensitivity",
34855:"ISOSpeedRatings",34856:{name:"OECF",description:function(a){return"[Raw OECF table data]"}},36864:{name:"ExifVersion",description:function(a){var c,d,b,f;d="";b=0;for(f=a.length;b<f;b++)c=a[b],d+=String.fromCharCode(c);return d}},36867:"DateTimeOriginal",36868:"DateTimeDigitized",37121:{name:"ComponentsConfiguration",description:function(a){var c,b,e,f;b="";e=0;for(f=a.length;e<f;e++)switch(c=a[e],c){case 49:b+="Y";break;case 50:b+="Cb";break;case 51:b+="Cr";break;case 52:b+="R";break;case 53:b+=
"G";break;case 54:b+="B"}return b}},37122:"CompressedBitsPerPixel",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBiasValue",37381:"MaxApertureValue",37382:"SubjectDistance",37383:{name:"MeteringMode",description:function(a){switch(a){case 1:return"Average";case 2:return"CenterWeightedAverage";case 3:return"Spot";case 4:return"MultiSpot";case 5:return"Pattern";case 6:return"Partial";case 255:return"Other";default:return"Unknown"}}},37384:{name:"LightSource",
description:function(a){switch(a){case 1:return"Daylight";case 2:return"Fluorescent";case 3:return"Tungsten (incandescent light)";case 4:return"Flash";case 9:return"Fine weather";case 10:return"Cloudy weather";case 11:return"Shade";case 12:return"Daylight fluorescent (D 5700 \u2013 7100K)";case 13:return"Day white fluorescent (N 4600 \u2013 5400K)";case 14:return"Cool white fluorescent (W 3900 \u2013 4500K)";case 15:return"White fluorescent (WW 3200 \u2013 3700K)";case 17:return"Standard light A";
case 18:return"Standard light B";case 19:return"Standard light C";case 20:return"D55";case 21:return"D65";case 22:return"D75";case 23:return"D50";case 24:return"ISO studio tungsten";case 255:return"Other light source";default:return"Unknown"}}},37385:{name:"Flash",description:function(a){switch(a){case 0:return"Flash did not fire";case 1:return"Flash fired";case 5:return"Strobe return light not detected";case 7:return"Strobe return light detected";case 9:return"Flash fired, compulsory flash mode";
case 13:return"Flash fired, compulsory flash mode, return light not detected";case 15:return"Flash fired, compulsory flash mode, return light detected";case 16:return"Flash did not fire, compulsory flash mode";case 24:return"Flash did not fire, auto mode";case 25:return"Flash fired, auto mode";case 29:return"Flash fired, auto mode, return light not detected";case 31:return"Flash fired, auto mode, return light detected";case 32:return"No flash function";case 65:return"Flash fired, red-eye reduction mode";
case 69:return"Flash fired, red-eye reduction mode, return light not detected";case 71:return"Flash fired, red-eye reduction mode, return light detected";case 73:return"Flash fired, compulsory flash mode, red-eye reduction mode";case 77:return"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected";case 79:return"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected";case 89:return"Flash fired, auto mode, red-eye reduction mode";case 93:return"Flash fired, auto mode, return light not detected, red-eye reduction mode";
case 95:return"Flash fired, auto mode, return light detected, red-eye reduction mode";default:return"Unknown"}}},37386:"FocalLength",37396:{name:"SubjectArea",description:function(a){switch(a.length){case 2:return"Location; X: "+a[0]+", Y: "+a[1];case 3:return"Circle; X: "+a[0]+", Y: "+a[1]+", diameter: "+a[2];case 4:return"Rectangle; X: "+a[0]+", Y: "+a[1]+", width: "+a[2]+", height: "+a[3];default:return"Unknown"}}},37500:{name:"MakerNote",description:function(a){return"[Raw maker note data]"}},
37510:{name:"UserComment",description:function(a){switch(a.slice(0,8).map(function(a){return String.fromCharCode(a)}).join("")){case "ASCII\x00\x00\x00":return a.slice(8,a.length).map(function(a){return String.fromCharCode(a)}).join("");case "JIS\x00\x00\x00\x00\x00":return"[JIS encoded text]";case "UNICODE\x00":return"[Unicode encoded text]";case "\x00\x00\x00\x00\x00\x00\x00\x00":return"[Undefined encoding]"}}},37520:"SubSecTime",37521:"SubSecTimeOriginal",37522:"SubSecTimeDigitized",40960:{name:"FlashpixVersion",
description:function(a){var b,d,e,f;d="";e=0;for(f=a.length;e<f;e++)b=a[e],d+=String.fromCharCode(b);return d}},40961:{name:"ColorSpace",description:function(a){switch(a){case 1:return"sRGB";case 65535:return"Uncalibrated";default:return"Unknown"}}},40962:"PixelXDimension",40963:"PixelYDimension",40964:"RelatedSoundFile",40965:"Interoperability IFD Pointer",41483:"FlashEnergy",41484:{name:"SpatialFrequencyResponse",description:function(a){return"[Raw SFR table data]"}},41486:"FocalPlaneXResolution",
41487:"FocalPlaneYResolution",41488:{name:"FocalPlaneResolutionUnit",description:function(a){switch(a){case 2:return"inches";case 3:return"centimeters";default:return"Unknown"}}},41492:{name:"SubjectLocation",description:function(a){return"X: "+a[0]+", Y: "+a[1]}},41493:"ExposureIndex",41495:{name:"SensingMethod",description:function(a){switch(a){case 1:return"Undefined";case 2:return"One-chip color area sensor";case 3:return"Two-chip color area sensor";case 4:return"Three-chip color area sensor";
case 5:return"Color sequential area sensor";case 7:return"Trilinear sensor";case 8:return"Color sequential linear sensor";default:return"Unknown"}}},41728:{name:"FileSource",description:function(a){switch(a){case 3:return"DSC";default:return"Unknown"}}},41729:{name:"SceneType",description:function(a){switch(a){case 1:return"A directly photographed image";default:return"Unknown"}}},41730:{name:"CFAPattern",description:function(a){return"[Raw CFA pattern table data]"}},41985:{name:"CustomRendered",
description:function(a){switch(a){case 0:return"Normal process";case 1:return"Custom process";default:return"Unknown"}}},41986:{name:"ExposureMode",description:function(a){switch(a){case 0:return"Auto exposure";case 1:return"Manual exposure";case 2:return"Auto bracket";default:return"Unknown"}}},41987:{name:"WhiteBalance",description:function(a){switch(a){case 0:return"Auto white balance";case 1:return"Manual white balance";default:return"Unknown"}}},41988:{name:"DigitalZoomRatio",description:function(a){switch(a){case 0:return"Digital zoom was not used";
default:return a}}},41989:{name:"FocalLengthIn35mmFilm",description:function(a){switch(a){case 0:return"Unknown";default:return a}}},41990:{name:"SceneCaptureType",description:function(a){switch(a){case 0:return"Standard";case 1:return"Landscape";case 2:return"Portrait";case 3:return"Night scene";default:return"Unknown"}}},41991:{name:"GainControl",description:function(a){switch(a){case 0:return"None";case 1:return"Low gain up";case 2:return"High gain up";case 3:return"Low gain down";case 4:return"High gain down";
default:return"Unknown"}}},41992:{name:"Contrast",description:function(a){switch(a){case 0:return"Normal";case 1:return"Soft";case 2:return"Hard";default:return"Unknown"}}},41993:{name:"Saturation",description:function(a){switch(a){case 0:return"Normal";case 1:return"Low saturation";case 2:return"High saturation";default:return"Unknown"}}},41994:{name:"Sharpness",description:function(a){switch(a){case 0:return"Normal";case 1:return"Soft";case 2:return"Hard";default:return"Unknown"}}},41995:{name:"DeviceSettingDescription",
description:function(a){return"[Raw device settings table data]"}},41996:{name:"SubjectDistanceRange",description:function(a){switch(a){case 1:return"Macro";case 2:return"Close view";case 3:return"Distant view";default:return"Unknown"}}},42016:"ImageUniqueID"},gps:{0:{name:"GPSVersionID",description:function(a){var b,d;return a[0]===(b=a[1])&&2===b&&a[2]===(d=a[3])&&0===d?"Version 2.2":"Unknown"}},1:{name:"GPSLatitudeRef",description:function(a){switch(a.join("")){case "N":return"North latitude";
case "S":return"South latitude";default:return"Unknown"}}},2:{name:"GPSLatitude",description:function(a){return a[0]+a[1]/60+a[2]/3600}},3:{name:"GPSLongitudeRef",description:function(a){switch(a.join("")){case "E":return"East longitude";case "W":return"West longitude";default:return"Unknown"}}},4:{name:"GPSLongitude",description:function(a){return a[0]+a[1]/60+a[2]/3600}},5:{name:"GPSAltitudeRef",description:function(a){switch(a){case 0:return"Sea level";case 1:return"Sea level reference (negative value)";
default:return"Unknown"}}},6:{name:"GPSAltitude",description:function(a){return a+" m"}},7:{name:"GPSTimeStamp",description:function(a){return a.map(function(a){var b,e,f;f=[];b=0;for(e=2-(""+Math.floor(a)).length;0<=e?b<e:b>e;0<=e?++b:--b)f.push("0");return f+a}).join(":")}},8:"GPSSatellites",9:{name:"GPSStatus",description:function(a){switch(a.join("")){case "A":return"Measurement in progress";case "V":return"Measurement Interoperability";default:return"Unknown"}}},10:{name:"GPSMeasureMode",description:function(a){switch(a.join("")){case "2":return"2-dimensional measurement";
case "3":return"3-dimensional measurement";default:return"Unknown"}}},11:"GPSDOP",12:{name:"GPSSpeedRef",description:function(a){switch(a.join("")){case "K":return"Kilometers per hour";case "M":return"Miles per hour";case "N":return"Knots";default:return"Unknown"}}},13:"GPSSpeed",14:{name:"GPSTrackRef",description:function(a){switch(a.join("")){case "T":return"True direction";case "M":return"Magnetic direction";default:return"Unknown"}}},15:"GPSTrack",16:{name:"GPSImgDirectionRef",description:function(a){switch(a.join("")){case "T":return"True direction";
case "M":return"Magnetic direction";default:return"Unknown"}}},17:"GPSImgDirection",18:"GPSMapDatum",19:{name:"GPSDestLatitudeRef",description:function(a){switch(a.join("")){case "N":return"North latitude";case "S":return"South latitude";default:return"Unknown"}}},20:{name:"GPSDestLatitude",description:function(a){return a[0]+a[1]/60+a[2]/3600}},21:{name:"GPSDestLongitudeRef",description:function(a){switch(a.join("")){case "E":return"East longitude";case "W":return"West longitude";default:return"Unknown"}}},
22:{name:"GPSDestLongitude",description:function(a){return a[0]+a[1]/60+a[2]/3600}},23:{name:"GPSDestBearingRef",description:function(a){switch(a.join("")){case "T":return"True direction";case "M":return"Magnetic direction";default:return"Unknown"}}},24:"GPSDestBearing",25:{name:"GPSDestDistanceRef",description:function(a){switch(a.join("")){case "K":return"Kilometers";case "M":return"Miles";case "N":return"Knots";default:return"Unknown"}}},26:"GPSDestDistance",27:{name:"GPSProcessingMethod",description:function(a){switch(a.slice(0,
8).map(function(a){return String.fromCharCode(a)}).join("")){case "ASCII\x00\x00\x00":return a.slice(8,a.length).map(function(a){return String.fromCharCode(a)}).join("");case "JIS\x00\x00\x00\x00\x00":return"[JIS encoded text]";case "UNICODE\x00":return"[Unicode encoded text]";case "\x00\x00\x00\x00\x00\x00\x00\x00":return"[Undefined encoding]"}}},28:{name:"GPSAreaInformation",description:function(a){switch(a.slice(0,8).map(function(a){return String.fromCharCode(a)}).join("")){case "ASCII\x00\x00\x00":return a.slice(8,
a.length).map(function(a){return String.fromCharCode(a)}).join("");case "JIS\x00\x00\x00\x00\x00":return"[JIS encoded text]";case "UNICODE\x00":return"[Unicode encoded text]";case "\x00\x00\x00\x00\x00\x00\x00\x00":return"[Undefined encoding]"}}},29:"GPSDateStamp",30:{name:"GPSDifferential",description:function(a){switch(a){case 0:return"Measurement without differential correction";case 1:return"Differential correction applied";default:return"Unknown"}}}},interoperability:{1:"InteroperabilityIndex",
2:"UnknownInteroperabilityTag0x0002",4097:"UnknownInteroperabilityTag0x1001",4098:"UnknownInteroperabilityTag0x1002"}};b.prototype.getTagValue=function(a){if(null!=this._tags[a])return this._tags[a].value};b.prototype.getTagDescription=function(a){if(null!=this._tags[a])return this._tags[a].description};b.prototype.getAllTags=function(){return this._tags};return b}()}).call(this);