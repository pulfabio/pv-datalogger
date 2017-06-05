export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Cruscotto',
            icon: 'fa fa-home fa-lg', //'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        },
        children: [
          {
            path: 'overall',
            data: {
              menu: {
                title: 'Complessivo'
              }
            }
          },
          {
            path: 'stored',
            data: {
              menu: {
                title: 'Accumulo'
              }
            }
          },
          {
            path: 'network',
            data: {
              menu: {
                title: 'Energia Prelevata'
              }
            }
          },
          {
            path: 'consumption',
            data: {
              menu: {
                title: 'Consumo Casa'
              }
            }
          },
          {
            path: 'photovoltaic',
            data: {
              menu: {
                title: 'Prod. Fotovoltaico'
              }
            }
          }
        ]
      },
      {
        path: 'balance',
        data: {
          menu: {
            title: 'Bilancio',
            icon: 'fa fa-bar-chart fa-lg', //'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 50,
          }
        },
        children: [
          {
            path: 'daily',
            data: {
              menu: {
                title: 'Bilancio-Giornaliero'
              }
            }
          },
          {
            path: 'monthly',
            data: {
              menu: {
                title: 'Bilancio-Mensile'
              }
            }
          },
          {
            path: 'annual',
            data: {
              menu: {
                title: 'Bilancio-Annuale'
              }
            }
          },
        ]
      },
      {
        path: 'history',
        data: {
          menu: {
            title: 'Storico',
            icon: 'fa fa-line-chart fa-lg', //'ion-ios-pulse-strong',
            selected: false,
            expanded: false,
            order: 60,
          }
        },
        children: [
          {
            path: 'summary',
            data: {
              menu: {
                title: 'Storico-Sommario'
              }
            }
          },
          {
            path: 'detail',
            data: {
              menu: {
                title: 'Storico-Dettaglio'
              }
            }
          },
        ]
      },
      {
        path: 'technical',
        data: {
          menu: {
            title: 'Area Tecnica',
            icon: 'fa fa-wrench fa-lg', //'ion-wrench',
            selected: false,
            expanded: false,
            order: 70,
          }
        },
        children: [
          {
            path: 'summary',
            data: {
              menu: {
                title: 'Area Tecnica-Sommario'
              }
            }
          },
          {
            path: 'detail',
            data: {
              menu: {
                title: 'Area Tecnica-Dettaglio'
              }
            }
          },
        ]
      },
      {
        path: 'events',
        data: {
          menu: {
            title: 'Eventi',
            icon: 'fa fa-calendar fa-lg', //'ion-android-calendar',
            selected: false,
            expanded: false,
            order: 80,
          }
        },
        children: [
          {
            path: 'latest',
            data: {
              menu: {
                title: 'Eventi Recenti'
              }
            }
          },
          {
            path: 'all',
            data: {
              menu: {
                title: 'Tutti gli Eventi'
              }
            }
          },
        ]
      },
      {
        path: 'loads',
        data: {
          menu: {
            title: 'Gestione Carichi',
            icon: 'fa fa-balance-scale fa-lg',
            selected: false,
            expanded: false,
            order: 80,
          }
        },
        children: [
          {
            path: 'rules',
            data: {
              menu: {
                title: 'Regole'
              }
            }
          },
          {
            path: 'contacts',
            data: {
              menu: {
                title: 'Contatti'
              }
            }
          }
        ]
      },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'Pages',
      //       icon: 'ion-document',
      //       selected: false,
      //       expanded: false,
      //       order: 650,
      //     }
      //   },
      //   children: [
      //     {
      //       path: ['/login'],
      //       data: {
      //         menu: {
      //           title: 'Login'
      //         }
      //       }
      //     },
      //     {
      //       path: ['/register'],
      //       data: {
      //         menu: {
      //           title: 'Register'
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'External Link',
      //       url: 'http://akveo.com',
      //       icon: 'ion-android-exit',
      //       order: 800,
      //       target: '_blank'
      //     }
      //   }
      // }
    ]
  }
];
