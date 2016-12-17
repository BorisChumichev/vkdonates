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
