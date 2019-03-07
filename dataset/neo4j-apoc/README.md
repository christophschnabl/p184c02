# Build the image from the Dockerfile
 1. move to the location of the dockerfile
 2. within this directory run the following command: `docker build -t frauddetection/neo4j-apoc .`

# Run the image
 1. obtain image-id `docker images`
 2. run the image `docker run -p 7474:7474 -p 7687:7687  -e NEO4J_dbms_security_procedures_unrestricted=apoc.\\\* <image-id>` 
