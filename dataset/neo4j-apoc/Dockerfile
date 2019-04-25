FROM neo4j:3.5.4
  
LABEL maintainer="Christoph Schnabl"

ENV GRAPH_ALGO_VERSION 3.5.4.0
ENV GRAPH_ALGO_URI https://github.com/neo4j-contrib/neo4j-graph-algorithms/releases/download/${GRAPH_ALGO_VERSION}/graph-algorithms-algo-${GRAPH_ALGO_VERSION}.jar

RUN wget $GRAPH_ALGO_URI && mv graph-algorithms-algo-${GRAPH_ALGO_VERSION}.jar plugins/apoc-${GRAPH_ALGO_VERSION}.jar

EXPOSE 7474 7687

CMD ["neo4j"]
