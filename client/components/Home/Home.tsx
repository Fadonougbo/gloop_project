import React from "react"
import '../../public/style/home/home.scss';

export const Home=()=> {

    console.log();

    return(
        <>
            <div id="page_head" >
                <h1>Restaurant finder</h1>
            </div>
            <form action="">
                <section>
                    <div className="input_container" >
                        <input type="text" name="name" placeholder="name"  id="" />
                    </div>
                    <div className="input_container" >
                        <input type="text" name="location" placeholder="location"  id="" />
                    </div>
                    <div className="input_container" >
                        <input type="number" name="price" placeholder="price"  id="" />
                    </div>
                    <div id="button_container" >
                        <button>Add</button>
                    </div>
                </section>
            </form>
        </>
    )
}