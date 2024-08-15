import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { MessageCircle } from 'lucide-react';

const hardwareData = [
    {
        image: <MessageCircle className="w-6 h-6 text-blue-500" />,
        name: "Placas de Vídeo",
        threads: "10",
        messages: "50"
    },
    {
        image: <MessageCircle className="w-6 h-6 text-blue-500" />,
        name: "Memórias RAM",
        threads: "15",
        messages: "75"
    },
    {
        image: <MessageCircle className="w-6 h-6 text-blue-500" />,
        name: "Processadores",
        threads: "8",
        messages: "40"
    },
    {
        image: <MessageCircle className="w-6 h-6 text-blue-500" />,
        name: "Armazenamento",
        threads: "12",
        messages: "60"
    },
    // Adicione mais itens se necessário
];

export default function HardwareTable() {
    return (
        <Table>

            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead>Threads</TableHead>
                    <TableHead className="text-right">Mensagens</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {hardwareData.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            {item.image} {/* Renderiza o ícone diretamente */}
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.threads}</TableCell>
                        <TableCell className="text-right">{item.messages}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">
                        {/* Você pode calcular o total de mensagens aqui, se desejar */}
                        {hardwareData.reduce((sum, item) => sum + parseInt(item.messages, 10), 0)}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
