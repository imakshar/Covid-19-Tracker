import React from "react";
import MaterialTable from "material-table";

const CustomMaterialTable = ({
    title,
    columns,
    data,
    onRowClick,
    action,
    freeAction,
    onFreeActionClick,
}) => {
    const handleRowClick = (event, rowData) => {
        if (onRowClick) {
            onRowClick(event, rowData);
        }
    };
    return (
        <MaterialTable
            title={title}
            columns={columns}
            data={data}
            options={{
                search: true,
            }}
            onRowClick={handleRowClick}
            actions={[
                action && {
                    icon: "visibility",
                    tooltip: "Show District Data",
                    onClick: (event, rowData) => onRowClick(event, rowData),
                },
                freeAction && {
                    icon: "close",
                    tooltip: "close",
                    isFreeAction: true,
                    onClick: (event) => onFreeActionClick(event),
                },
            ]}
        />
    );
};

export default CustomMaterialTable;
