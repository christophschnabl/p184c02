import Navigo from './navigo';


const neo4jURI = 'bolt://127.0.0.1:7687';
const neo4jUSER = 'neo4j';
const neo4jPASS = 'root';

/**
 * draw function
 */
function initNeoVis() {
    const config = {
        container_id: 'vis',
        server_url: neo4jURI,
        server_user: neo4jUSER,
        server_password: neo4jPASS,
        labels: {
            Customer: {
                caption: 'name',
                size: 'pagerank',
                community: 'community',
            },
        },
        relationships: {
            TRANSACTION: {
                thickness: 'weight',
                caption: false,
                community: 'community',
                color: 'green',
            },
            HAS_ADDRESS: {
                thickness: 'weight',
                caption: false,
                community: 'community',
                color: 'green',
            },
            HAS_SSN: {
                thickness: 'weight',
                caption: false,
                community: 'community',
                color: 'green',
            },
            USES_CREDITCARD: {
                thickness: 'weight',
                caption: false,
                community: 'community',
                color: 'green',
            },
            USES_PHONENUMBER: {
                thickness: 'weight',
                caption: false,
                community: 'community',
                color: 'green',
            },
        },
        initial_cypher: `match(n:Customer) return n limit 100;`,
        arrows: true,
        hierarchical_layout: true,
        hierarchical_sort_method: 'directed',
    };

    window.vis = new NeoVis.default(config);
    /* 
    window.vis.registerOnEvent('completed', (values) => {
        if (values.record_count > 0) {
            resultText.css('color', 'green');
            resultText.text(`Query completed, ${values.record_count} results!`);
        } else {
            resultText.css('color', 'orange');
            resultText.text('Query completed, no results!');
        }
    }); */
    window.vis.render();
}

/**
 * Initializes router
 */
function initRouter() {
    const root = null;
    const useHash = true; // Defaults to: false
    const hash = '#!'; // Defaults to: '#'
    const router = new Navigo(root, useHash, hash);

    router
        .on('/abteilungsleiter', () => {
            // display all the products
        })
        .resolve();

    router
        .on(() => {
            // show home page here
        })
        .resolve();

    router
        .on({
            abteilungsleiter: () => {
                setContent('About');
            },
            '*': () => {
                setContent('Home');
            },
        })
        .resolve();
}

$(document).ready(() => {
    initNeoVis();
    initRouter();

    $('#stabilize').click(() => {
        window.vis.stabilize();
    });

    $('#queryBetweenness').click(() => {
        $('#result').text('Executing Query... ');
        const limit = parseInt($('#limit1').val(), 10);
        const cypher = `match(c:Customer)
                          with collect(c) as customers
                          call apoc.algo.betweenness(['TRANSACTION'], customers, 'BOTH')
                          yield node, score
                          return node, score
                          order by score desc ${limit ? `limit ${limit}` : ';'}`;
        window.vis.renderWithCypher(cypher);
    });

    $('#queryCloseness').click(() => {
        resultText.text('Executing Query... ');
        const limit = parseInt($('#limit1').val(), 10);
        const cypher = `match(c:Customer)
                          with collect(c) as customers
                          call apoc.algo.closeness(['TRANSACTION'], customers, 'BOTH')
                          yield node, score
                          return node, score
                          order by score desc ${limit ? `limit ${limit}` : ';'}`;
        viz.renderWithCypher(cypher);
    });

    $('#queryCustomer').click(() => {
        $('#result').text('Executing Query... ');
        const limit = parseInt($('#limit2').val(), 10);
        const from = $('#from').is(':checked') ? '>' : '';
        const to = $('#to').is(':checked') ? '<' : '';
        const cypher = `match (c:Customer {name:'${$('#name').val()}'})
                                ${to}-[r:TRANSACTION]-${from}
                                (c2:Customer)
                          return c, r, c2 ${limit ? `limit ${limit}` : ';'}`;

        window.vis.renderWithCypher(cypher);
    });

    $('#queryIdentity').click(() => {
        $('#result').text('Executing Query... ');
        const checked = [$('#idAddress')[0].checked,
            $('#idPhone')[0].checked, $('#idSSN')[0].checked, $('#idCreditCard')[0].checked];

        let cypher = '';
        if ($('#idName')[0].checked) {
            cypher = `match(n:Customer)-[r]-(n2:Customer {name: n.name})
                          return n, r, n2;`;
        } else {
            let relation = '';
            if ($('#idAddress')[0].checked) {
                relation = ':HAS_ADDRESS';
            } else if ($('#idPhone')[0].checked) {
                relation = ':USES_PHONENUMBER';
            } else if ($('#idSSN')[0].checked) {
                relation = ':HAS_SSN';
            } else if ($('#idCreditCard')[0].checked) {
                relation = ':USES_CREDITCARD';
            }

            cypher = `match(n:Customer)-[r${relation}]-(n2)-[r2]-(n3:Customer)
                            where labels(n2) <> labels(n)
                            return n, r, n2, r2, n3`;
        }

        window.vis.renderWithCypher(cypher);
    });
});