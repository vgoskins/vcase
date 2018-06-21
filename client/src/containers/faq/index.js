import React, { Component } from 'react';
import $ from 'jquery';

class FaqList extends Component {
  componentDidMount() {
    $('#accordion').on('show.bs.collapse', e => {
      $(e.target)
        .parent()
        .addClass('faq-shown');
    });
    $('#accordion').on('hide.bs.collapse', e => {
      $(e.target)
        .parent()
        .removeClass('faq-shown');
    });
  }

  componentWillUnmount() {
    $('#accordion').off('show.bs.collapse');
    $('#accordion').off('hide.bs.collapse');
  }

  render() {
    let faqIndex = 0;
    return (
      <section className="faq">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>VCASE FAQ</h2>
              <div id="accordion">
                <div className="card">
                  <div className="card-header" id={`heading-${faqIndex}`}>
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link full-width"
                        data-toggle="collapse"
                        data-target={`#collapse-${faqIndex}`}
                        aria-expanded="true"
                        aria-controls={`collapse-${faqIndex}`}
                      >
                        What is vCase.gg and how does it work?
                      </button>
                    </h5>
                  </div>
                  <div
                    id={`collapse-${faqIndex}`}
                    className="collapse"
                    aria-labelledby={`heading-${faqIndex++}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      vCase.gg is the case opening site for{' '}
                      <a href="http://vgo.gg/" target="_blank">
                        VGO items.{' '}
                      </a>. vCases are opened with a vKey.
                      <br />
                      <br />
                      VGO items are digital items generated using blockchain
                      technology, so anyone can trade a VGO item to whoever they
                      want, whenever they want, without any restrictions, trade
                      holds, or fear of bannings. Every VGO item is
                      one-of-a-kind and generated from an Ethereum smart
                      contract. These items cannot ever be subjected to any
                      trading restrictions such as trade holds or bans.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id={`heading-${faqIndex}`}>
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link full-width"
                        data-toggle="collapse"
                        data-target={`#collapse-${faqIndex}`}
                        aria-expanded="true"
                        aria-controls={`collapse-${faqIndex}`}
                      >
                        How do I get a vKey?
                      </button>
                    </h5>
                  </div>
                  <div
                    id={`collapse-${faqIndex}`}
                    className="collapse"
                    aria-labelledby={`heading-${faqIndex++}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      There are two ways to get a vKey:
                      <ul>
                        <li>
                          Purchase one from a marketplace that supports VGO
                          items
                        </li>
                        <li>Get a vKey in a trade from another VGO user</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id={`heading-${faqIndex}`}>
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link full-width"
                        data-toggle="collapse"
                        data-target={`#collapse-${faqIndex}`}
                        aria-expanded="true"
                        aria-controls={`collapse-${faqIndex}`}
                      >
                        Why is there only one type of vKey?
                      </button>
                    </h5>
                  </div>
                  <div
                    id={`collapse-${faqIndex}`}
                    className="collapse"
                    aria-labelledby={`heading-${faqIndex++}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      For simplicity, any vKey can open any vCase.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id={`heading-${faqIndex}`}>
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link full-width"
                        data-toggle="collapse"
                        data-target={`#collapse-${faqIndex}`}
                        aria-expanded="true"
                        aria-controls={`collapse-${faqIndex}`}
                      >
                        Why does it take so long to open a vCase?
                      </button>
                    </h5>
                  </div>
                  <div
                    id={`collapse-${faqIndex}`}
                    className="collapse"
                    aria-labelledby={`heading-${faqIndex++}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      vCase.gg is based on the Ethereum blockchain for now,
                      which brings many advantages over traditional case opening
                      sites, mainly transparency. However until we migrate to
                      the WAX Blockchain, case openings can take up to two
                      minutes to complete because of the speed of Ethereum
                      blockchain. The WAX Blockchain will be much faster and
                      will make case openings instant.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id={`heading-${faqIndex}`}>
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link full-width"
                        data-toggle="collapse"
                        data-target={`#collapse-${faqIndex}`}
                        aria-expanded="true"
                        aria-controls={`collapse-${faqIndex}`}
                      >
                        Where do my VGO items go once a vCase is opened?
                      </button>
                    </h5>
                  </div>
                  <div
                    id={`collapse-${faqIndex}`}
                    className="collapse"
                    aria-labelledby={`heading-${faqIndex++}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      The VGO items that you receive from a vCase opening are
                      sent to your{' '}
                      <a href="//trade.opskins.com/inventory" target="_blank">
                        OPSkins ExpressTrade Inventory
                      </a>.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id={`heading-${faqIndex}`}>
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link full-width"
                        data-toggle="collapse"
                        data-target={`#collapse-${faqIndex}`}
                        aria-expanded="true"
                        aria-controls={`collapse-${faqIndex}`}
                      >
                        What can I do with my VGO items once I receive them?
                      </button>
                    </h5>
                  </div>
                  <div
                    id={`collapse-${faqIndex}`}
                    className="collapse"
                    aria-labelledby={`heading-${faqIndex++}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      You can trade your VGO items to another VGO user for free
                      on VGO.gg, as long as you have their VGO Trade URL. You
                      can also sell or trade them to any marketplace that
                      supports VGO items.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id={`heading-${faqIndex}`}>
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link full-width"
                        data-toggle="collapse"
                        data-target={`#collapse-${faqIndex}`}
                        aria-expanded="true"
                        aria-controls={`collapse-${faqIndex}`}
                      >
                        What are the vCase opening odds?
                      </button>
                    </h5>
                  </div>
                  <div
                    id={`collapse-${faqIndex}`}
                    className="collapse"
                    aria-labelledby={`heading-${faqIndex++}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      VCases's opening odds are on average around 3x better than
                      Steam's case opening odds.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id={`heading-${faqIndex}`}>
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link full-width"
                        data-toggle="collapse"
                        data-target={`#collapse-${faqIndex}`}
                        aria-expanded="true"
                        aria-controls={`collapse-${faqIndex}`}
                      >
                        How do I know that the vCase odds are what you claim
                        they are?
                      </button>
                    </h5>
                  </div>
                  <div
                    id={`collapse-${faqIndex}`}
                    className="collapse"
                    aria-labelledby={`heading-${faqIndex++}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      You can check the results of all vCase openings because
                      all items generated from vCases are recorded on the
                      Ethereum blockchain. Each item generated links back to a
                      blockchain transaction for full transparency. For this
                      reason, VGO items also cannot be duplicated.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id={`heading-${faqIndex}`}>
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link full-width"
                        data-toggle="collapse"
                        data-target={`#collapse-${faqIndex}`}
                        aria-expanded="true"
                        aria-controls={`collapse-${faqIndex}`}
                      >
                        Can I lose my VGO items, or can VGO get shut down by
                        Steam?
                      </button>
                    </h5>
                  </div>
                  <div
                    id={`collapse-${faqIndex}`}
                    className="collapse"
                    aria-labelledby={`heading-${faqIndex++}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      No. Since VGO uses blockchain technology, neither Steam or
                      anyone else can shut it down. If the OPSkins ExpressTrade
                      website disappeared tomorrow, the data behind the items
                      would still exist and could be rendered with graphics to
                      showcase the unique properties of the items.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id={`heading-${faqIndex}`}>
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link full-width"
                        data-toggle="collapse"
                        data-target={`#collapse-${faqIndex}`}
                        aria-expanded="true"
                        aria-controls={`collapse-${faqIndex}`}
                      >
                        Why is there a minimum case opening quantity?
                      </button>
                    </h5>
                  </div>
                  <div
                    id={`collapse-${faqIndex}`}
                    className="collapse"
                    aria-labelledby={`heading-${faqIndex++}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      Because vCase is operating on the Ethereum blockchain at
                      this time, there is a minimum case opening quantity due to
                      ETH gas fees. Once we migrate to the WAX Blockchain, these
                      minimums will change
                    </div>
                  </div>
                </div>
                <h2 className="sub-header">
                  How can I build my own vCase opening site?
                </h2>
                <div className="card">
                  <div className="card-header" id={`heading-${faqIndex}`}>
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link full-width"
                        data-toggle="collapse"
                        data-target={`#collapse-${faqIndex}`}
                        aria-expanded="true"
                        aria-controls={`collapse-${faqIndex}`}
                      >
                        Can I create my own vCase.gg case opening site?
                      </button>
                    </h5>
                  </div>
                  <div
                    id={`collapse-${faqIndex}`}
                    className="collapse"
                    aria-labelledby={`heading-${faqIndex++}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      Yes. The vCase code is open source and available on our{' '}
                      <a href="https://github.com/vgoskins" taget="_blank">
                        GitHub
                      </a>.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id={`heading-${faqIndex}`}>
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link full-width"
                        data-toggle="collapse"
                        data-target={`#collapse-${faqIndex}`}
                        aria-expanded="true"
                        aria-controls={`collapse-${faqIndex}`}
                      >
                        Is there an affiliate program for vCase sites?
                      </button>
                    </h5>
                  </div>
                  <div
                    id={`collapse-${faqIndex}`}
                    className="collapse"
                    aria-labelledby={`heading-${faqIndex++}`}
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      Yes. All sites that adopt the vCase functionality will
                      automatically earn a 5% affiliate fee, paid to you in
                      real-time in ETH. Because the vCase affiliate program is
                      smart-contract based, when someone uses a vKey to open a
                      vCase on your site, your payment will be sent instantly to
                      your Ethereum address.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default FaqList;
