import urlFactory from 'url-factory'

export const paymentURL = urlFactory(
    'https://money.yandex.ru',
    { 'short-dest': 'Пожертвование «Вконтакте»'
    , 'paymentType': 'AC'
    , 'quickpay-form': 'donate'
    , 'shop-host': 'vkdonates.ru'
    , 'quickpay-back-url': 'vkdonates.ru'
    , 'targets': 'Пожертвование «Вконтакте»'
    , 'comment': ''
    }
  )

export const plural = (n, titles) =>
  titles[
    (n % 100 > 4 && n % 100 < 20)
      ? 2
      : [2, 0, 1, 1, 1, 2][
          (n % 10 < 5)
            ? n % 10
            : 5
        ]
  ]
