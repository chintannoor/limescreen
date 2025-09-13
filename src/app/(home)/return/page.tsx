import Footer from '@/components/common/Footer/page'
import Header from '@/components/common/Header/page'
import Link from 'next/link'
import React from 'react'

const ReturnPolicy = () => {
  return (
    <>
    <Header/>
    <div
      className="breadcrumbs"
      style={{
        backgroundImage: "url('/assets/images/breadcrumbs-bg.jpg')",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-7 col-12">
            <div className="breadcrumbs-content">
              <h2>Return Policy</h2>
            </div>
          </div>
          <div className="col-lg-5 col-md-5 col-12">
            <div className="breadcrumbs-menu">
              <ul>
                <li>
                  <Link href="/">
                    Home
                  </Link>
                  <i className="fa fa-angle-double-right"></i>
                </li>
                <li className="active">
                  <Link href="/site/return">Return Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="policy__area pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="policy__wrapper policy__translate p-relative z-index-1">
              <div className="policy__list mb-35">
                <h3 className="policy__title">Return Policy</h3>
                <ul>
                  <li>
                    Clients are eligible for a refund if the talent is absent on
                    the day of an assigned service or if their services did not
                    meet expectations. In such scenarios, clients have to bear
                    traveling and accommodation costs, if any. The balance will
                    be credited back to the payment source.
                  </li>
                  <li>
                    Unauthorized use and access of the Limescreen Entertainment
                    website and your (talent and client) account by persons
                    other than the registered party may result in your account
                    being suspended or removed. If any fees or subscriptions
                    were paid, they will not be refunded.
                  </li>
                  <li>
                    While subscribing to Limescreen Entertainment services, if
                    you provide any falsified information, we will block access
                    to your account. Furthermore, we will not provide a refund
                    of any payments that were made during the period of use.
                  </li>
                  <li>
                    If you have paid any monthly subscription fee, it is not
                    eligible for a refund. However, you can cancel future
                    subscriptions to avoid any charges later.
                  </li>
                  <li>
                    If you notice any payment inconsistencies in your bank
                    statement, please notify Limescreen Entertainment within 30
                    days after they first appear. If you notify us after this
                    period, you cannot claim refunds of any kind.
                  </li>
                  <li>
                    You are eligible for a full refund on subscriptions longer
                    than one month if you cancel it before the renewal period or
                    7 days after purchasing the subscription.
                  </li>
                  <li>
                    If you have signed up for a free trial that converts into an
                    annual subscription, then you have a 7-day cancellation
                    window that starts once the free trial ends. In such a case,
                    you are eligible for a refund. If you cancel after the
                    7-day window or if it is a monthly subscription, then you
                    are not eligible for a refund.
                  </li>
                  <li>
                    If your subscription is longer than one month and it is
                    going to be renewed, you can cancel within 7 days of the
                    renewal date to receive a full refund. If you cancel after 7
                    days, you will not receive a refund.
                  </li>
                  <li>
                    You can cancel monthly subscriptions (initial and renewals)
                    at any time but you will not get a refund.
                  </li>
                  <li>
                    You can access your subscription until it expires if your
                    canceled subscription was not eligible for a refund.
                  </li>
                  <li>
                    All refunds will be made to the source of payment, i.e.,
                    your debit or credit card. Please check with your bank, with
                    the refund reference number provided by us, the date by
                    which your refund will be credited.
                  </li>
                  <li>
                    If you have purchased any subscriptions via the Limescreen
                    Entertainment Casting iOS app and Apple App Store, all
                    refund and cancellation requests must be submitted to Apple
                    through your iTunes account.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  )
}

export default ReturnPolicy;