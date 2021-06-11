
export default function NewPools (props) {
    state: {
      volume: { },
      liquidity: { },
      tx: { },
      launchedDays: { },
      pools: []
    },

    onEffect (() => {
      loadPools()
    }, [])

    trunc(input, maxLength) {
      if (input.length > maxLength) {
          return input.substring(0, maxLength) + '...';
      }
      return input;
    },

    sortBy(column) {

      var poolCount = this.state.pools.length
      if (poolCount == 0) { return }
      var firstEl = eval(`this.state.pools[0].${column}`).replace(/\D/g, '')
      var lastEl = eval(`this.state.pools[poolCount - 1].${column}`).replace(/\D/g, '')
      var newPools

      if (firstEl < lastEl) {
        newPools = this.state.pools.sort(function(a, b) {
          return parseInt(eval(`b.${column}`).replace(/\D/g, '')) - parseInt(eval(`a.${column}`).replace(/\D/g, ''))
        })
      } else {
        newPools = this.state.pools.sort(function(a, b) {
          return parseInt(eval(`a.${column}`).replace(/\D/g, '')) - parseInt(eval(`b.${column}`).replace(/\D/g, ''))
        })
      }

      this.update({ pools: newPools })
    },

    async loadPools() {
      let createdAt = Math.floor(Date.now() / 1000) - (parseInt(this.$('#launched-days').value) * 3600 * 24)

      const query = `
      {
        pairs(first: 100, where: {
          createdAtTimestamp_gte: ${createdAt},
          volumeUSD_gte: ${this.$('#volume-min').value},
          txCount_gte: ${this.$('#tx-min').value},
          reserveUSD_gte: ${this.$('#liquidity-min').value}
        }) {
          id
          token0 {
            id
            name
            symbol
            tradeVolumeUSD
          }
          token1 {
            id
            name
            symbol
            tradeVolumeUSD
          }
          volumeUSD
          txCount
          reserveUSD
          createdAtTimestamp
        }
      }`.replace(/(\r\n|\n|\r)/gm, "")

      var res = await fetch("https://tokenscan.herokuapp.com/https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: '{ "query": "' + query + '" }'
      })

      var jsonRes = await res.json()
      var pairs = Array.from(jsonRes.data.pairs)

      var newPools = pairs.map(item => {
          const container = {}

          var daysAgo = ((Math.floor(Date.now() / 1000) - parseInt(item.createdAtTimestamp)) / 3600 / 24).toFixed(1)
          primaryToken = [item.token0, item.token1].sort(function(a, b) { return parseInt(a.tradeVolumeUSD) - parseInt(b.tradeVolumeUSD)})[0]

          container.symbol = this.trunc(primaryToken.symbol, 10)
          container.liquidity = Math.round(parseInt(item.reserveUSD)).toLocaleString()
          container.volume = Math.round(parseInt(item.volumeUSD)).toLocaleString()
          container.vlRatio = (item.volumeUSD / item.reserveUSD).toFixed(1)
          container.txCount = Math.round(parseInt(item.txCount)).toLocaleString()
          container.launchedDays = daysAgo
          container.tokenAddress = primaryToken.id

          return container
      }).sort(function(a, b) { return parseInt(b.volume.replace(/\D/g, '')) - parseInt(a.volume.replace(/\D/g, '')) })

      this.update({ pools: newPools })
    },

    switchDirection() {
      var direction = (this.state.swapDirection == "BUY") ? "SELL" : "BUY"

      this.update({
        inputAmount: this.outputAmount(),
      })
    }
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div class="wrapper"><div class="filters"><div class="filter-section"><div class="filter"><label>Total volume >=</label><input type="number" id="volume-min" placeholder="min" value="10000"/></div><div class="filter"><label>Liquidity >=</label><input type="number" id="liquidity-min" placeholder="min" value="10000"/></div></div><div class="filter-section"><div class="filter"><label>Tx count >=</label><input type="number" id="tx-min" placeholder="min" value="100"/></div><div class="filter"><label>Pool launched since (days)</label><input type="number" id="launched-days" placeholder="days ago" value="3"/></div></div><button expr0="expr0">SEARCH UNISWAP POOLS</button></div><table class="results"><tr><th expr1="expr1">Symbol</th><th expr2="expr2">Liquidity ($)</th><th expr3="expr3">Volume ($)</th><th expr4="expr4">Vol/Liq</th><th expr5="expr5">Tx count</th><th expr6="expr6">Days active</th><th></th></tr><tr expr7="expr7"></tr></table></div>',
      [{
        'redundantAttribute': 'expr0',
        'selector': '[expr0]',

        'expressions': [{
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return scope.loadPools;
          }
        }]
      }, {
        'redundantAttribute': 'expr1',
        'selector': '[expr1]',

        'expressions': [{
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return () => scope.sortBy('symbol');
          }
        }]
      }, {
        'redundantAttribute': 'expr2',
        'selector': '[expr2]',

        'expressions': [{
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return () => scope.sortBy('liquidity');
          }
        }]
      }, {
        'redundantAttribute': 'expr3',
        'selector': '[expr3]',

        'expressions': [{
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return () => scope.sortBy('volume');
          }
        }]
      }, {
        'redundantAttribute': 'expr4',
        'selector': '[expr4]',

        'expressions': [{
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return () => scope.sortBy('vlRatio');
          }
        }]
      }, {
        'redundantAttribute': 'expr5',
        'selector': '[expr5]',

        'expressions': [{
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return () => scope.sortBy('txCount');
          }
        }]
      }, {
        'redundantAttribute': 'expr6',
        'selector': '[expr6]',

        'expressions': [{
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return () => scope.sortBy('launchedDays');
          }
        }]
      }, {
        'type': bindingTypes.EACH,
        'getKey': null,
        'condition': null,

        'template': template(
          '<td><a expr8="expr8" target="_blank"> </a></td><td expr9="expr9"> </td><td expr10="expr10"> </td><td expr11="expr11"> </td><td expr12="expr12"> </td><td expr13="expr13"> </td><td><a expr14="expr14" target="_blank" class="no-underline">🔍</a></td>',
          [{
            'redundantAttribute': 'expr8',
            'selector': '[expr8]',

            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.pool.symbol;
              }
            }, {
              'type': expressionTypes.ATTRIBUTE,
              'name': 'href',

              'evaluate': function(scope) {
                return ['https://uniswap.info/token/', scope.pool.tokenAddress].join('');
              }
            }]
          }, {
            'redundantAttribute': 'expr9',
            'selector': '[expr9]',

            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.pool.liquidity;
              }
            }]
          }, {
            'redundantAttribute': 'expr10',
            'selector': '[expr10]',

            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.pool.volume;
              }
            }]
          }, {
            'redundantAttribute': 'expr11',
            'selector': '[expr11]',

            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.pool.vlRatio;
              }
            }]
          }, {
            'redundantAttribute': 'expr12',
            'selector': '[expr12]',

            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.pool.txCount;
              }
            }]
          }, {
            'redundantAttribute': 'expr13',
            'selector': '[expr13]',

            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.pool.launchedDays;
              }
            }]
          }, {
            'redundantAttribute': 'expr14',
            'selector': '[expr14]',

            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'href',

              'evaluate': function(scope) {
                return [
                  'https://twitter.com/search?q=%24',
                  scope.pool.symbol,
                  '&src=typed_query&f=live'
                ].join('');
              }
            }]
          }]
        ),

        'redundantAttribute': 'expr7',
        'selector': '[expr7]',
        'itemName': 'pool',
        'indexName': null,

        'evaluate': function(scope) {
          return scope.state.pools;
        }
      }]
    );
  },

  'name': 'pools'

}
