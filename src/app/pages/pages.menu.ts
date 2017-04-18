export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Cruscotto',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'balance',
        data: {
          menu: {
            title: 'Bilancio',
            icon: 'ion-ios-pulse-strong',
            selected: false,
            expanded: false,
            order: 50,
          }
        },
      },
      {
        path: 'history',
        data: {
          menu: {
            title: 'Storico',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 60,
          }
        },
      },
      {
        path: 'technical',
        data: {
          menu: {
            title: 'Area Tecnica',
            icon: 'ion-wrench',
            selected: false,
            expanded: false,
            order: 70,
          }
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Pages',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 650,
          }
        },
        children: [
          {
            path: ['/login'],
            data: {
              menu: {
                title: 'Login'
              }
            }
          },
          {
            path: ['/register'],
            data: {
              menu: {
                title: 'Register'
              }
            }
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Menu Level 1',
            icon: 'ion-ios-more',
            selected: false,
            expanded: false,
            order: 700,
          }
        },
        children: [
          {
            path: '',
            data: {
              menu: {
                title: 'Menu Level 1.1',
                url: '#'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'Menu Level 1.2',
                url: '#'
              }
            },
            children: [
              {
                path: '',
                data: {
                  menu: {
                    title: 'Menu Level 1.2.1',
                    url: '#'
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'External Link',
            url: 'http://akveo.com',
            icon: 'ion-android-exit',
            order: 800,
            target: '_blank'
          }
        }
      }
    ]
  }
];
