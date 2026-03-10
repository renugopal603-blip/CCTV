import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const OrderContext = createContext();

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const [serviceRequests, setServiceRequests] = useState([]);
    const [salaryHistory, setSalaryHistory] = useState([]);

    // Load from LocalStorage or seed mock data
    useEffect(() => {
        const savedOrders = localStorage.getItem('sv_orders');
        const savedNotifications = localStorage.getItem('sv_notifications');
        const savedAttendance = localStorage.getItem('sv_attendance');
        const savedLeaves = localStorage.getItem('sv_leaves');
        const savedService = localStorage.getItem('sv_service');
        const savedSalary = localStorage.getItem('sv_salary');

        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        } else {
            const mockOrders = [
                { id: 'ORD-101', customerName: 'Rajesh Kumar', productName: '4K Outdoor Bullet Camera', address: 'Indiranagar, Bangalore', phone: '+91 98765 00001', status: 'Pending', assignedTo: null, installationDate: '2024-03-20', workType: 'Installation', createdAt: new Date().toISOString() },
                { id: 'ORD-102', customerName: 'Priya Sharma', productName: 'Smart Home 360 Dome', address: 'Koramangala, Bangalore', phone: '+91 98765 00002', status: 'Pending', assignedTo: null, installationDate: '2024-03-21', workType: 'Installation', createdAt: new Date().toISOString() },
                { id: 'ORD-103', customerName: 'Anita Singh', productName: 'Thermal Detection System', address: 'Whitefield, Bangalore', phone: '+91 98765 00003', status: 'Pending', assignedTo: null, installationDate: '2024-03-22', workType: 'Installation', createdAt: new Date().toISOString() },
                { id: 'ORD-104', customerName: 'Vikram AD', productName: 'NVR 8-Ch Recording Kit', address: 'HSR Layout, Bangalore', phone: '+91 98765 00004', status: 'Pending', assignedTo: null, installationDate: '2024-03-23', workType: 'Maintenance', createdAt: new Date().toISOString() },
                { id: 'ORD-105', customerName: 'Sanjay Gupta', productName: 'Solar Powered Wireless Cam', address: 'Jayanagar, Bangalore', phone: '+91 98765 00005', status: 'Pending', assignedTo: null, installationDate: '2024-03-24', workType: 'Repair', createdAt: new Date().toISOString() },
            ];
            setOrders(mockOrders);
        }

        if (savedAttendance) setAttendance(JSON.parse(savedAttendance));
        else {
            setAttendance([
                { id: 1, date: '2024-03-01', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: 9, status: 'Present' },
                { id: 2, date: '2024-03-02', checkIn: '09:15 AM', checkOut: '06:10 PM', hours: 8.9, status: 'Present' },
                { id: 3, date: '2024-03-03', checkIn: '-', checkOut: '-', hours: 0, status: 'Sunday' },
                { id: 4, date: '2024-03-04', checkIn: '08:50 AM', checkOut: '05:45 PM', hours: 8.9, status: 'Present' },
            ]);
        }

        if (savedLeaves) setLeaves(JSON.parse(savedLeaves));
        else {
            setLeaves([
                { id: 1, type: 'Sick', startDate: '2024-02-10', endDate: '2024-02-11', reason: 'Flu', status: 'Approved' },
                { id: 2, type: 'Casual', startDate: '2024-03-15', endDate: '2024-03-15', reason: 'Personal work', status: 'Pending' },
            ]);
        }

        if (savedService) setServiceRequests(JSON.parse(savedService));
        else {
            setServiceRequests([
                { id: 'SR-501', customerName: 'Amit Verma', issue: 'Camera Feed Blurry', priority: 'Medium', status: 'In Progress' },
                { id: 'SR-502', customerName: 'Sita Ram', issue: 'Recording Not Working', priority: 'High', status: 'Pending' },
                { id: 'SR-503', customerName: 'Rahul Roy', issue: 'App Connection Error', priority: 'Low', status: 'Completed' },
            ]);
        }

        if (savedSalary) setSalaryHistory(JSON.parse(savedSalary));
        else {
            setSalaryHistory([
                { month: 'February 2024', base: 45000, bonus: 2000, deductions: 1500, total: 45500 },
                { month: 'January 2024', base: 45000, bonus: 3000, deductions: 1500, total: 46500 },
                { month: 'December 2023', base: 42000, bonus: 5000, deductions: 1200, total: 45800 },
            ]);
        }

        if (savedNotifications) {
            setNotifications(JSON.parse(savedNotifications));
        } else {
            const mockNotifs = [
                { id: 'NTF-1', message: 'New Installation Job: Indiranagar', orderId: 'ORD-101', read: false, createdAt: new Date().toISOString() },
                { id: 'NTF-2', message: 'Monthly Meeting Reminder: Tomorrow at 10 AM', orderId: null, read: false, createdAt: new Date().toISOString() },
                { id: 'NTF-3', message: 'Salary Credited for February 2024', orderId: null, read: true, createdAt: new Date().toISOString() },
            ];
            setNotifications(mockNotifs);
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem('sv_orders', JSON.stringify(orders));
        localStorage.setItem('sv_notifications', JSON.stringify(notifications));
        localStorage.setItem('sv_attendance', JSON.stringify(attendance));
        localStorage.setItem('sv_leaves', JSON.stringify(leaves));
        localStorage.setItem('sv_service', JSON.stringify(serviceRequests));
        localStorage.setItem('sv_salary', JSON.stringify(salaryHistory));
    }, [orders, notifications, attendance, leaves, serviceRequests, salaryHistory]);

    const placeOrder = (orderData) => {
        const newOrder = {
            ...orderData,
            id: `ORD-${Date.now()}`,
            status: 'Pending',
            assignedTo: null,
            workType: orderData.workType || 'Installation',
            installationDate: orderData.installationDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
            createdAt: new Date().toISOString()
        };
        setOrders(prev => [newOrder, ...prev]);

        const notification = {
            id: `NTF-${Date.now()}`,
            message: `New Order from ${newOrder.customerName || 'Customer'}: ${Array.isArray(newOrder.items) ? newOrder.items.length + ' items' : (newOrder.productName || 'Equipment')}`,
            orderId: newOrder.id,
            read: false,
            createdAt: new Date().toISOString()
        };
        setNotifications(prev => [notification, ...prev]);
        toast.info("Order processed and admin notified!");
    };

    const acceptOrder = (orderId, employeeId, employeeName) => {
        setOrders(prevOrders => {
            const orderIndex = prevOrders.findIndex(o => o.id === orderId);
            const order = prevOrders[orderIndex];

            if (order && order.assignedTo) {
                toast.warning("This order has already been locked by another employee.");
                return prevOrders;
            }

            const updatedOrders = [...prevOrders];
            updatedOrders[orderIndex] = {
                ...order,
                assignedTo: employeeId,
                assignedName: employeeName,
                status: 'Processing'
            };

            toast.success("Order locked and moved to Processing!");
            return updatedOrders;
        });
    };

    const updateOrderStatus = (orderId, status) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
        toast.info(`Status updated to: ${status}`);
    };

    const updateServiceStatus = (id, status) => {
        setServiceRequests(prev => prev.map(s => s.id === id ? { ...s, status } : s));
        toast.info(`Service request updated to: ${status}`);
    };

    const addLeaveRequest = (leave) => {
        const newLeave = { ...leave, id: Date.now(), status: 'Pending' };
        setLeaves(prev => [newLeave, ...prev]);
        toast.success("Leave request submitted successfully!");
    };

    const handleAttendance = (type) => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateStr = now.toISOString().split('T')[0];

        if (type === 'check-in') {
            const newEntry = { id: Date.now(), date: dateStr, checkIn: timeStr, checkOut: '-', hours: 0, status: 'In Progress' };
            setAttendance(prev => [newEntry, ...prev]);
            toast.success("Checked in successfully!");
        } else {
            setAttendance(prev => prev.map(a => {
                if (a.date === dateStr && a.checkOut === '-') {
                    return { ...a, checkOut: timeStr, status: 'Present', hours: 8.5 }; // Simulating full day
                }
                return a;
            }));
            toast.success("Checked out successfully!");
        }
    };

    const clearNotification = (notificationId) => {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
    };

    const markNotificationsAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    return (
        <OrderContext.Provider value={{
            orders,
            notifications,
            attendance,
            leaves,
            serviceRequests,
            salaryHistory,
            placeOrder,
            acceptOrder,
            updateOrderStatus,
            updateServiceStatus,
            addLeaveRequest,
            handleAttendance,
            clearNotification,
            markNotificationsAsRead
        }}>
            {children}
        </OrderContext.Provider>
    );
};
