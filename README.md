This project is an HTML5 widget for displaying county level maps. This widget was designed to be a common code base that supports multiple configurable widgets. 

Technical Specifications:

This widget was developed in the current CDC Widget Framework. It uses Angular.js for MVC, TopoJSON for conversion of shapefiles to json, and the Datamaps.js library for rendering TopoJson data-driven maps. 

Adding A New Instances:

Instances of this widget are defined in json files under the 'instances' folder'. The json should be formatted according to the example 'heartdiseaseaandstroke.json'. To add a new instance, create a copy of the example json file and change the configuration variables to point the appropriate datasets. To load the widget, add this parameter to the standard widget framework embed code: data-instance-name="[file name]", for example:

<div data-cdc-widget="CountyMaps" data-instance-name="HeartDiseaseAndStroke"></div>

Updating Geography:

In the event county lines have been redrawn, instructions for updating the TopoJSON files for rendering counties can be found under data/topoinstructions.txt