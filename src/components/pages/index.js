import { Component } from 'react'
import { observer } from 'mobx-react'

@observer
class Page extends Component {
  fetchBlueprint (page, search) {
    return new Promise((resolve, reject) => {
      this.props.store.TransportLayer.fetchPage(page, this.props.params, search).then((...rest) => {
        this.props.store.loadData(...rest).then(resolve).catch(reject)
        if (this.state) {
          this.setState({blueprintReady: true})
        }
      }).catch(reject)
    })
  }

  get blueprint () {
    return this.props.store.blueprints[this.props.location.pathname]
  }
}

export default Page
