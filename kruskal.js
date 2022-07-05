// classe Unir e encontrar
class UnionFind {
  constructor(vertices) {
    this.parent = {};
    // Inicia a floresta de módo que todos os vértices tem a si mesmo como pais
    vertices.forEach((e) => (this.parent[e] = e));
  }
  // método que retorna todos os elementos
  elements() {
    return this.parent;
  }
  // Une as os vértices caso eles não estejam na mesma floresta e não formem ciclos.
  union(vertice1, vertice2) {
    let rootA = this.find(vertice1);
    let rootB = this.find(vertice2);
    if (rootA === rootB) return;
    if (rootA < rootB) {
      if (this.parent[vertice2] != vertice2) this.union(this.parent[vertice2], vertice1);
      this.parent[vertice2] = this.parent[vertice1];
    } else {
      if (this.parent[vertice1] != vertice1) this.union(this.parent[vertice1], vertice2);
      this.parent[vertice1] = this.parent[vertice2];
    }
  }

  // retorna o pai de um vértice
  find(a) {
    if (this.parent[a] == a) return a;
    return (this.parent[a] = this.find(this.parent[a]));
  }

  // Verifica se 2 vértices não formam ciclos
  connected(a, b) {
    return this.find(a) == this.find(b);
  }
}
// Classe fila de prioridadades
class PriorityQueue {
  constructor() {
    this.values = [];
  }
  // método que retorna os elementos na fila de prioridade
  elements() {
    return this.values;
  }
  // método que adiciona na fila um valor com sua prioridade,nesse caso o peso da aresta
  enfileirar(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  // método que retira o primeiro elemento da fila e devolve.
  desinfileirar() {
    return this.values.shift();
  }
  // método que ordena as arestas da menor para a maior, 
  // baseado na prioridade
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

// Classe para instanciar vários grafos
class Grafo {
  constructor() {
    this.adjacencyList = {};
  }
  // método que adiciona um vértice ao grafo
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  // método que retorna todos os vértices do grafo
  getVertices(vertex) {
    return this.adjacencyList;
  }
  // método que adiciona uma aresta em algum vértice do grafo,
  // como o grafo não é direcionado é adicionado no vertice 1 o vertice 2
  // com seus respectivos pesos
  addEdge(vertex1, vertex2, peso) {
    this.adjacencyList[vertex1].push({ vertice: vertex2, peso });
    this.adjacencyList[vertex2].push({ vertice: vertex1, peso });
  }
  // método que devolve o custo minímo da árvore gerado miníma encontrada do grafo original
  mst() {
    let vertices = graph.getVertices();
    let fila = new PriorityQueue();
    // esse laço vai enfileirar todas as arestas de acordo com seu peso(prioridade)
    for (let prop in vertices) {
      vertices[prop].forEach((aresta) => {
        fila.enfileirar([prop, aresta.vertice], aresta.peso);
      });
    }
    // enquanto a lista de priorideades tiver arestas,
    // vai executar esse laço, procurar, verificar se 
    // os vértices não possuem ciclos e unir eles,
    // até que a fila esteja vazia.
    while (fila.elements().length - 1 > 0) {
      let nextEdge = fila.desinfileirar();
      let nodes = nextEdge.val;
      let weight = nextEdge.priority;
      // se os 2 vértices não formam  ciclos, insere no novo grafo mst(árvore geradora miníma) essa aresta
      if (!uf.connected(nodes[0], nodes[1])) {
        mst.addEdge(nodes[0], nodes[1], weight);
        uf.union(nodes[0], nodes[1]);
      }
    }
    let mstVertices = mst.getVertices();
    console.log(mstVertices, 'Vértices da árvore geradora miníma')
    let total = 0;
    // esse laço percorre todos os vértices adicionados 
    // na árvore geradora miníma e calcula o custo total deles
    for (let prop in mstVertices) {
      mstVertices[prop].forEach((aresta) => {
        // essa divisão é pq quando adicionamos uma aresta, ela adiciona em 2 vertices,
        // se deixar o custo das 2 aresta adicionadas vai dar o dobro do valor minimo sempre da
        // árvore geradora miníma, por isso temos que tirar essa diferença
        total += aresta.peso / 2;
      });
    }
    console.log(total, "Min cost spanning tree");
  }
}
// instanciando um novo objeto da Classe Grafo
let graph = new Grafo();


// instanciando um novo objeto da Classe Grafo
// essa instância do grafo serve apenas para
// adicionarmos a esse grafo as arestas geradas na árvore geradora miníma
let mst = new Grafo();

// Inserindo os vértices (nós) para formar o grafo
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addVertex("G");
graph.addVertex("H");
graph.addVertex("I");
graph.addVertex("J");
graph.addVertex("K");
graph.addVertex("L");

// Inserindo as arestas entre os vértices
graph.addEdge("A", "B", 2);
graph.addEdge("A", "E", 3);
graph.addEdge("B", "C", 3);
graph.addEdge("B", "F", 1);
graph.addEdge("C", "D", 1);
graph.addEdge("C", "G", 2);
graph.addEdge("D", "H", 5);
graph.addEdge("E", "F", 4);
graph.addEdge("E", "I", 4);
graph.addEdge("F", "G", 3);
graph.addEdge("F", "J", 2);
graph.addEdge("G", "H", 3);
graph.addEdge("G", "K", 4);
graph.addEdge("I", "J", 3);
graph.addEdge("J", "K", 3);
graph.addEdge("K", "L", 1);
graph.addEdge("H", "L", 3);

// inserindo apenas os vértices para gerar a árvore geradora mínima.
mst.addVertex("A");
mst.addVertex("B");
mst.addVertex("C");
mst.addVertex("D");
mst.addVertex("E");
mst.addVertex("F");
mst.addVertex("G");
mst.addVertex("H");
mst.addVertex("I");
mst.addVertex("J");
mst.addVertex("K");
mst.addVertex("L");

// Passando apenas os vértices para a UnionFind encontrar e unir os vértices que vai 
// ser passado na fila de prioridade.
let uf = new UnionFind([
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
]);
// chamando o método que devolve o custo total da árvore geradora miníma
graph.mst()