# Visualizing Delaunay Triangulation

A Delaunay Triangulation forms a graph from a set of vertices in such a way that no vertex is in the circumcircle of any other triangle. Delaunay Trianglulations have many applications: they are used in Voronoi diagrams, height interpolation, and triangle meshes to name a few.

This repo implements Delaunay Triangulation using the Bowyer-Watson algorithm, which runs in quadratic time with respect to the number of vertices. The visualizer lets you adjust the number/bounds of vertices, and displays it in a Pixi canvas. 
