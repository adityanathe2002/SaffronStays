import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export let staysContext = createContext();

const TentsContext = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // login details
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // login details
    const [admin , setAdmin] = useState([])
    const [userDetails, setUserDetails] = useState("");
    const [allTents, setAllTents] = useState([]);
    const [allHotels, setAllHotels] = useState([]);
    const [allHomeStays, setAllHomestays] = useState([]);
    const [allCamps, setAllCamps] = useState([]);
    const [allVillas, setAllVillas] = useState([]);
    const [allFarmHouses, setAllFarmHouses] = useState([]);
    const [allTreeHouses, setAllTreeHouses] = useState([]);
    const [allCottages, setAllCottages] = useState([]);
    const [allApartments, setAllApartments] = useState([]);
    const [filteredStays, setFilteredStays] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [filteredHomestays, setFilteredHomestays] = useState([]);
    const [filteredCamps, setFilteredCamps] = useState([]);
    const [filteredVillas, setFilteredVillas] = useState([]);
    const [filteredApartments, setFilteredApartments] = useState([]);
    const [filteredFarmhouse, setFilteredFarmhouses] = useState([]);
    const [filteredTreeHouses, setFilteredTreeHouses] = useState([]);
    const [filteredCottages, setFilteredCottages] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [sortPrice, setSortPrice] = useState([]);
    const [sortAmenities, setSortAmenities] = useState([]);
    const [sortCapacity, setSortCapacity] = useState([]);
    const [sortLocation, setSortLocation] = useState([]);
    const [search, setSearch] = useState("");
    const [addBookmark , setAddBookmark] = useState([]);
    const [addCart , setAddCart] = useState([]);
    const [bookingData, setBookingData] = useState([])
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [ confirmOrder, setConfirmOrder] = useState(false);
    

    useEffect(() => {
        document.body.className = theme;  
        localStorage.setItem('theme', theme); 
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    
    useEffect(()=>{
        axios.get("http://localhost:5000/admin").then((resp)=>{
            setAdmin(resp.data)
        }).catch((error)=>{console.log(error)})
    },[])
    
    useEffect(() => {
        axios.get("http://116.75.62.44:5000/tents")
        // axios.get("http://localhost:5000/tents")
            .then((resp) => {
                setAllTents(resp.data);
                setFilteredStays(resp.data)
            }).catch((error) => { console.log(error) })
    }, [])

    useEffect(() => {
        axios.get("http://116.75.62.44:5000/homeStays")
        // axios.get("http://localhost:5000/homestays")
            .then((resp) => {
                setAllHomestays(resp.data);
                setFilteredStays(resp.data);
            }).catch((error) => { console.log(error) })
    }, [])

    useEffect(() => {
        axios.get("http://116.75.62.44:5000/hotels")
        // axios.get("http://localhost:5000/hotels")
            .then((resp) => {
                setAllHotels(resp.data);
                setFilteredHotels(resp.data);
            }).catch((error) => { console.log(error) })
    }, [])

    useEffect(() => {
        axios.get("http://116.75.62.44:5000/camps")
        // axios.get("http://localhost:5000/camps")
            .then((resp) => {
                setAllCamps(resp.data);
                // setFilteredHotels(resp.data);
            }).catch((error) => { console.log(error) })
    }, [])

    useEffect(() => {
      axios.get("http://116.75.62.44:5000/farmhouses")
        // axios.get("http://localhost:5000/farmhouses")
            .then((resp) => {
                setAllFarmHouses(resp.data);
                // setFilteredHotels(resp.data);
            }).catch((error) => { console.log(error) })
    }, [])

    useEffect(() => {
         axios.get("http://116.75.62.44:5000/villas")
        // axios.get("http://localhost:5000/villas")
            .then((resp) => {
                setAllVillas(resp.data);
                // setFilteredHotels(resp.data);
            }).catch((error) => { console.log(error) })
    }, [])

    useEffect(() => {
         axios.get("http://116.75.62.44:5000/apartments")
        // axios.get("http://localhost:5000/apartments")
            .then((resp) => {
                setAllApartments(resp.data);
                // setFilteredHotels(resp.data);
            }).catch((error) => { console.log(error) })
    }, [])

    useEffect(() => {
        axios.get("http://116.75.62.44:5000/cottages")
        // axios.get("http://localhost:5000/cottages")
            .then((resp) => {
                setAllCottages(resp.data);
                // setFilteredHotels(resp.data);
            }).catch((error) => { console.log(error) })
    }, [])

    useEffect(() => {
        axios.get("http://116.75.62.44:5000/treehouses")
        // axios.get("http://localhost:5000/treehouses")
            .then((resp) => {
                setAllTreeHouses(resp.data);
                // setFilteredHotels(resp.data);
            }).catch((error) => { console.log(error) })
    }, [])

    useEffect(() => {
        let filteredItems = [...allTents];

        if (search) {
            filteredItems = filteredItems.filter(stays =>
                stays.address.dist.toLowerCase().includes(search.toLowerCase()) ||
                stays.campName.toLowerCase().includes(search.toLowerCase()) ||
                stays.address.tal.toLowerCase().includes(search.toLowerCase()) ||
                stays.freeServices.includes(search)
            );
        }

        if (sortPrice.length > 0) {
            filteredItems = filteredItems.filter(stay => {
                const price = stay.prices?.afterDiscount || 0;

                return sortPrice.some((range) => {
                    if (range.includes("Under")) {
                        const max = Number(range.replace(/\D/g, "")); // Extract number (₹5000 → 5000)
                        return price < max;
                    }
                    if (range.includes("Above")) {
                        const min = Number(range.replace(/\D/g, "")); // Extract number (₹15000 → 15000)
                        return price > min;
                    }
                    const [min, max] = range.replace(/₹/g, "").split(" - ").map(Number);
                    return price >= min && price <= max;
                });
            });
        }
        if (sortAmenities.length > 0) {
            filteredItems = filteredItems.filter(val =>
                val.freeServices && sortAmenities.some(amenity => val.freeServices.includes(amenity))
            );
        }
        if (ratings.length > 0) {
            filteredItems = filteredItems.filter(val => {
                return val.ratings.location && val.ratings.location >= parseFloat(ratings);
            });
        }
        if (sortLocation.length > 0) {
            filteredItems = filteredItems.filter(val =>
                val.address.dist && sortLocation.some(location => val.address.dist.includes(location))
            );
        }

        setFilteredStays(filteredItems);
    }, [allTents, sortPrice, sortAmenities, ratings, sortLocation, search]);

    useEffect(() => {
        let filteredHotelsItems = [...allHotels];

        if (sortPrice.length > 0) {
            filteredHotelsItems = filteredHotelsItems.filter(stay => {
                const price = stay.prices?.afterDiscount || 0;

                return sortPrice.some((range) => {
                    if (range.includes("Under")) {
                        const max = Number(range.replace(/\D/g, "")); // Extract number (₹5000 → 5000)
                        return price < max;
                    }
                    if (range.includes("Above")) {
                        const min = Number(range.replace(/\D/g, "")); // Extract number (₹15000 → 15000)
                        return price > min;
                    }
                    const [min, max] = range.replace(/₹/g, "").split(" - ").map(Number);
                    return price >= min && price <= max;
                });
            });
        }
        if (sortAmenities.length > 0) {
            filteredHotelsItems = filteredHotelsItems.filter(val =>
                val.freeServices && sortAmenities.some(amenity => val.freeServices.includes(amenity))
            );
        }
        if (ratings.length > 0) {
            filteredHotelsItems = filteredHotelsItems.filter(val => {
                return val.ratings.location && val.ratings.location >= parseFloat(ratings);
            });
        }
        if (sortLocation.length > 0) {
            filteredHotelsItems = filteredHotelsItems.filter(val =>
                val.address.dist && sortLocation.some(location => val.address.dist.includes(location))
            );
        }

        setFilteredHotels(filteredHotelsItems);
    }, [allHotels, sortPrice, sortAmenities, ratings, sortLocation]);

    useEffect(() => {
        let filteredHomestaysItems = [...allHomeStays];

        if (sortPrice.length > 0) {
            filteredHomestaysItems = filteredHomestaysItems.filter(stay => {
                const price = stay.prices?.afterDiscount || 0;

                return sortPrice.some((range) => {
                    if (range.includes("Under")) {
                        const max = Number(range.replace(/\D/g, "")); // Extract number (₹5000 → 5000)
                        return price < max;
                    }
                    if (range.includes("Above")) {
                        const min = Number(range.replace(/\D/g, "")); // Extract number (₹15000 → 15000)
                        return price > min;
                    }
                    const [min, max] = range.replace(/₹/g, "").split(" - ").map(Number);
                    return price >= min && price <= max;
                });
            });
        }
        if (sortAmenities.length > 0) {
            filteredHomestaysItems = filteredHomestaysItems.filter(val =>
                val.freeServices && sortAmenities.some(amenity => val.freeServices.includes(amenity))
            );
        }
        if (ratings.length > 0) {
            filteredHomestaysItems = filteredHomestaysItems.filter(val => {
                return val.ratings.location && val.ratings.location >= parseFloat(ratings);
            });
        }
        if (sortLocation.length > 0) {
            filteredHomestaysItems = filteredHomestaysItems.filter(val =>
                val.address.dist && sortLocation.some(location => val.address.dist.includes(location))
            );
        }

        setFilteredHomestays(filteredHomestaysItems);
    }, [allHomeStays, sortPrice, sortAmenities, ratings, sortLocation]);

    useEffect(() => {
        let filteredCampItems = [...allCamps];

        if (search) {
            filteredCampItems = filteredCampItems.filter(stays =>
                stays.address.dist.toLowerCase().includes(search.toLowerCase()) ||
                stays.campName.toLowerCase().includes(search.toLowerCase()) ||
                stays.address.tal.toLowerCase().includes(search.toLowerCase()) ||
                stays.freeServices.includes(search)
            );
        }

        if (sortPrice.length > 0) {
            filteredCampItems = filteredCampItems.filter(stay => {
                const price = stay.prices?.afterDiscount || 0;

                return sortPrice.some((range) => {
                    if (range.includes("Under")) {
                        const max = Number(range.replace(/\D/g, "")); // Extract number (₹5000 → 5000)
                        return price < max;
                    }
                    if (range.includes("Above")) {
                        const min = Number(range.replace(/\D/g, "")); // Extract number (₹15000 → 15000)
                        return price > min;
                    }
                    const [min, max] = range.replace(/₹/g, "").split(" - ").map(Number);
                    return price >= min && price <= max;
                });
            });
        }
        if (sortAmenities.length > 0) {
            filteredCampItems = filteredCampItems.filter(val =>
                val.freeServices && sortAmenities.some(amenity => val.freeServices.includes(amenity))
            );
        }
        if (ratings.length > 0) {
            filteredCampItems = filteredCampItems.filter(val => {
                return val.ratings.location && val.ratings.location >= parseFloat(ratings);
            });
        }
        if (sortLocation.length > 0) {
            filteredCampItems = filteredCampItems.filter(val =>
                val.address.dist && sortLocation.some(location => val.address.dist.includes(location))
            );
        }

        setFilteredCamps(filteredCampItems);
    }, [allCamps, sortPrice, sortAmenities, ratings, sortLocation, search]);

    useEffect(() => {
        let filteredVillasItems = [...allVillas];

        if (search) {
            filteredVillasItems = filteredVillasItems.filter(stays =>
                stays.address.dist.toLowerCase().includes(search.toLowerCase()) ||
                stays.campName.toLowerCase().includes(search.toLowerCase()) ||
                stays.address.tal.toLowerCase().includes(search.toLowerCase()) ||
                stays.freeServices.includes(search)
            );
        }

        if (sortPrice.length > 0) {
            filteredVillasItems = filteredVillasItems.filter(stay => {
                const price = stay.prices?.afterDiscount || 0;

                return sortPrice.some((range) => {
                    if (range.includes("Under")) {
                        const max = Number(range.replace(/\D/g, "")); // Extract number (₹5000 → 5000)
                        return price < max;
                    }
                    if (range.includes("Above")) {
                        const min = Number(range.replace(/\D/g, "")); // Extract number (₹15000 → 15000)
                        return price > min;
                    }
                    const [min, max] = range.replace(/₹/g, "").split(" - ").map(Number);
                    return price >= min && price <= max;
                });
            });
        }
        if (sortAmenities.length > 0) {
            filteredVillasItems = filteredVillasItems.filter(val =>
                val.freeServices && sortAmenities.some(amenity => val.freeServices.includes(amenity))
            );
        }
        if (ratings.length > 0) {
            filteredVillasItems = filteredVillasItems.filter(val => {
                return val.ratings.location && val.ratings.location >= parseFloat(ratings);
            });
        }
        if (sortLocation.length > 0) {
            filteredVillasItems = filteredVillasItems.filter(val =>
                val.address.dist && sortLocation.some(location => val.address.dist.includes(location))
            );
        }

        setFilteredVillas(filteredVillasItems);
    }, [allVillas, sortPrice, sortAmenities, ratings, sortLocation, search]);

    useEffect(() => {
        let filteredApartmentsItems = [...allApartments];

        if (search) {
            filteredApartmentsItems = filteredApartmentsItems.filter(stays =>
                stays.address.dist.toLowerCase().includes(search.toLowerCase()) ||
                stays.campName.toLowerCase().includes(search.toLowerCase()) ||
                stays.address.tal.toLowerCase().includes(search.toLowerCase()) ||
                stays.freeServices.includes(search)
            );
        }

        if (sortPrice.length > 0) {
            filteredApartmentsItems = filteredApartmentsItems.filter(stay => {
                const price = stay.prices?.afterDiscount || 0;

                return sortPrice.some((range) => {
                    if (range.includes("Under")) {
                        const max = Number(range.replace(/\D/g, "")); // Extract number (₹5000 → 5000)
                        return price < max;
                    }
                    if (range.includes("Above")) {
                        const min = Number(range.replace(/\D/g, "")); // Extract number (₹15000 → 15000)
                        return price > min;
                    }
                    const [min, max] = range.replace(/₹/g, "").split(" - ").map(Number);
                    return price >= min && price <= max;
                });
            });
        }
        if (sortAmenities.length > 0) {
            filteredApartmentsItems = filteredApartmentsItems.filter(val =>
                val.freeServices && sortAmenities.some(amenity => val.freeServices.includes(amenity))
            );
        }
        if (ratings.length > 0) {
            filteredApartmentsItems = filteredApartmentsItems.filter(val => {
                return val.ratings.location && val.ratings.location >= parseFloat(ratings);
            });
        }
        if (sortLocation.length > 0) {
            filteredApartmentsItems = filteredApartmentsItems.filter(val =>
                val.address.dist && sortLocation.some(location => val.address.dist.includes(location))
            );
        }

        setFilteredApartments(filteredApartmentsItems);
    }, [allApartments, sortPrice, sortAmenities, ratings, sortLocation, search]);

    useEffect(() => {
        let filteredFarmhousesItems = [...allFarmHouses];

        if (search) {
            filteredFarmhousesItems = filteredFarmhousesItems.filter(stays =>
                stays.address.dist.toLowerCase().includes(search.toLowerCase()) ||
                stays.campName.toLowerCase().includes(search.toLowerCase()) ||
                stays.address.tal.toLowerCase().includes(search.toLowerCase()) ||
                stays.freeServices.includes(search)
            );
        }

        if (sortPrice.length > 0) {
            filteredFarmhousesItems = filteredFarmhousesItems.filter(stay => {
                const price = stay.prices?.afterDiscount || 0;

                return sortPrice.some((range) => {
                    if (range.includes("Under")) {
                        const max = Number(range.replace(/\D/g, "")); // Extract number (₹5000 → 5000)
                        return price < max;
                    }
                    if (range.includes("Above")) {
                        const min = Number(range.replace(/\D/g, "")); // Extract number (₹15000 → 15000)
                        return price > min;
                    }
                    const [min, max] = range.replace(/₹/g, "").split(" - ").map(Number);
                    return price >= min && price <= max;
                });
            });
        }
        if (sortAmenities.length > 0) {
            filteredFarmhousesItems = filteredFarmhousesItems.filter(val =>
                val.freeServices && sortAmenities.some(amenity => val.freeServices.includes(amenity))
            );
        }
        if (ratings.length > 0) {
            filteredFarmhousesItems = filteredFarmhousesItems.filter(val => {
                return val.ratings.location && val.ratings.location >= parseFloat(ratings);
            });
        }
        if (sortLocation.length > 0) {
            filteredFarmhousesItems = filteredFarmhousesItems.filter(val =>
                val.address.dist && sortLocation.some(location => val.address.dist.includes(location))
            );
        }

        setFilteredFarmhouses(filteredFarmhousesItems);
    }, [allFarmHouses, sortPrice, sortAmenities, ratings, sortLocation, search]);

    useEffect(() => {
        let filteredTreeHousesItems = [...allTreeHouses];

        if (search) {
            filteredTreeHousesItems = filteredTreeHousesItems.filter(stays =>
                stays.address.dist.toLowerCase().includes(search.toLowerCase()) ||
                stays.campName.toLowerCase().includes(search.toLowerCase()) ||
                stays.address.tal.toLowerCase().includes(search.toLowerCase()) ||
                stays.freeServices.includes(search)
            );
        }

        if (sortPrice.length > 0) {
            filteredTreeHousesItems = filteredTreeHousesItems.filter(stay => {
                const price = stay.prices?.afterDiscount || 0;

                return sortPrice.some((range) => {
                    if (range.includes("Under")) {
                        const max = Number(range.replace(/\D/g, "")); // Extract number (₹5000 → 5000)
                        return price < max;
                    }
                    if (range.includes("Above")) {
                        const min = Number(range.replace(/\D/g, "")); // Extract number (₹15000 → 15000)
                        return price > min;
                    }
                    const [min, max] = range.replace(/₹/g, "").split(" - ").map(Number);
                    return price >= min && price <= max;
                });
            });
        }
        if (sortAmenities.length > 0) {
            filteredTreeHousesItems = filteredTreeHousesItems.filter(val =>
                val.freeServices && sortAmenities.some(amenity => val.freeServices.includes(amenity))
            );
        }
        if (ratings.length > 0) {
            filteredTreeHousesItems = filteredTreeHousesItems.filter(val => {
                return val.ratings.location && val.ratings.location >= parseFloat(ratings);
            });
        }
        if (sortLocation.length > 0) {
            filteredTreeHousesItems = filteredTreeHousesItems.filter(val =>
                val.address.dist && sortLocation.some(location => val.address.dist.includes(location))
            );
        }

        setFilteredTreeHouses(filteredTreeHousesItems);
    }, [allTreeHouses, sortPrice, sortAmenities, ratings, sortLocation, search]);

    useEffect(() => {
        let filteredCottagesItems = [...allCottages];

        if (search) {
            filteredCottagesItems = filteredCottagesItems.filter(stays =>
                stays.address.dist.toLowerCase().includes(search.toLowerCase()) ||
                stays.campName.toLowerCase().includes(search.toLowerCase()) ||
                stays.address.tal.toLowerCase().includes(search.toLowerCase()) ||
                stays.freeServices.includes(search)
            );
        }

        if (sortPrice.length > 0) {
            filteredCottagesItems = filteredCottagesItems.filter(stay => {
                const price = stay.prices?.afterDiscount || 0;

                return sortPrice.some((range) => {
                    if (range.includes("Under")) {
                        const max = Number(range.replace(/\D/g, "")); // Extract number (₹5000 → 5000)
                        return price < max;
                    }
                    if (range.includes("Above")) {
                        const min = Number(range.replace(/\D/g, "")); // Extract number (₹15000 → 15000)
                        return price > min;
                    }
                    const [min, max] = range.replace(/₹/g, "").split(" - ").map(Number);
                    return price >= min && price <= max;
                });
            });
        }
        if (sortAmenities.length > 0) {
            filteredCottagesItems = filteredCottagesItems.filter(val =>
                val.freeServices && sortAmenities.some(amenity => val.freeServices.includes(amenity))
            );
        }
        if (ratings.length > 0) {
            filteredCottagesItems = filteredCottagesItems.filter(val => {
                return val.ratings.location && val.ratings.location >= parseFloat(ratings);
            });
        }
        if (sortLocation.length > 0) {
            filteredCottagesItems = filteredCottagesItems.filter(val =>
                val.address.dist && sortLocation.some(location => val.address.dist.includes(location))
            );
        }

        setFilteredCottages(filteredCottagesItems);
    }, [allCottages, sortPrice, sortAmenities, ratings, sortLocation, search]);

    return (
        <staysContext.Provider value={{
            allTents, allHomeStays, allHotels, allVillas, allApartments,
            allCamps, allCottages, allFarmHouses, allTreeHouses, ratings, setRatings,
            sortPrice, setSortPrice, sortAmenities, setSortAmenities,
            sortLocation, setSortLocation, filteredStays, filteredHotels,
            search, setSearch, filteredCamps, filteredVillas, filteredHomestays,
            filteredFarmhouse, filteredTreeHouses, filteredApartments, filteredCottages,
            admin,setAdmin,isLoggedIn, setIsLoggedIn, userDetails,setUserDetails,
            addBookmark , setAddBookmark,addCart , setAddCart,isAdminLoggedIn, setIsAdminLoggedIn,
            bookingData, setBookingData,theme, toggleTheme,  confirmOrder, setConfirmOrder
        }}>
            {children}
        </staysContext.Provider>
    )
}

export default TentsContext