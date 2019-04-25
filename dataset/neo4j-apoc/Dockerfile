FROM neo4j:3.5.4
  
LABEL maintainer="Christoph Schnabl"

ENV APOC_VERSION 3.5.4.0
ENV APOC_URI https://github.com/neo4j-contrib/neo4j-graph-algorithms/releases/download/${APOC_VERSION}/graph-algorithms-algo-${APOC_VERSION}.jar

RUN wget $APOC_URI && mv graph-algorithms-algo-${APOC_VERSION}.jar plugins/apoc-${APOC_VERSION}.jar

EXPOSE 7474 7473 7687

CMD ["neo4j"]
