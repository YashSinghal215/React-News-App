import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
    let {title , description , imageUrl , newsurl, author , date , source} = this.props;
    return (
      <div className="my-3">
        <div className="card">

          <div style={{display:'flex' , position:'absolute' , right:'0',justifyContent:'flex-end'}}>
            <span className='badge rounded-pill bg-danger'>{source}</span>
          </div>
            <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className='class-text'><small className='text-muted'>By {!author?"Unknown":author} at {new Date(date).toGMTString()  } </small></p>
                <a href={newsurl} className="btn btn-sm btn-dark">Go somewhere</a>
            </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
