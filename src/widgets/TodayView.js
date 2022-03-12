import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Divider, IconButton, Input, Modal, Paper, Stack, Typography } from "@mui/material"
import InfoCard from "../components/InfoCard"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import FoodCard from "../components/FoodCard";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Box, height } from "@mui/system";
import FoodCal from "../components/FoodCal";


function TodayView() {
	const [expanded, setExpanded] = useState(false);
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (<div className='today-view'>
		<Paper elevation={3} className='paper'>
			<h3>Today status</h3>

			<Stack
				direction={{ xs: 'column', sm: 'row' }}
				spacing={{ xs: 1, sm: 2, md: 4 }}
				justifyContent="center"
				alignItems="flex-start"
			>
				<InfoCard
					header={{ title: "RDI", subheader: "Recomanded Daily Intake", avatar: "/favicon.png" }}
					value="2500 Calories"
					description="The RDI (Recomanded Daily Intake) of calories calculated accourding to your body
					wegiht, hight, age and gender. It will be varry with your helth and other medical conditions.
					This value use to only for tracking purpose."
				/>

				<InfoCard
					header={{ title: "Current Intake", avatar: "/favicon.png" }}
					value="1000 Calories"
					description="The RDI (Recomanded Daily Intake) of calories calculated accourding to your body
					wegiht, hight, age and gender. It will be varry with your helth and other medical conditions.
					This value use to only for tracking purpose."
				/>

				<InfoCard
					header={{ title: "Day Summery", subheader: "Percentage of daily requrement", avatar: "/favicon.png" }}
					value="50%"
					description="Eat rest of 50% end of the day. You have to get lunch and dinner"
				/>
			</Stack>
		</Paper>

		<Paper elevation={3} className='paper'>
			<h3>Meal Records</h3>

			<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					<Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
						Breakfirst
					</Typography>
					<Typography variant="h5" sx={{ color: 'text.secondary' }}>750 Calories</Typography>
					<Divider orientation="vertical" flexItem variant="middle" textAlign="center" sx={{width: 10}} />
					<Typography variant="h5" sx={{ color: 'text.secondary' }}>15%</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Stack
						direction="column"
						spacing={1}
						justifyContent="center"
						alignItems="center"
					>
						<FoodCard
							header={{ title: "Rice and Curry", avatar: "/favicon.png" }}
							value="2500 Calories"
						/>

						<FoodCard
							header={{ title: "Bunana", avatar: "/favicon.png" }}
							value="1000 Calories"
						/>

						<IconButton aria-label="delete" size="large" color="success" onClick={handleOpen}>
							<FastfoodIcon />
						</IconButton>
					</Stack>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2bh-content"
					id="panel2bh-header"
				>
					<Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
					<Typography sx={{ color: 'text.secondary' }}>
						You are currently not an owner
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
						varius pulvinar diam eros in elit. Pellentesque convallis laoreet
						laoreet.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel3bh-content"
					id="panel3bh-header"
				>
					<Typography sx={{ width: '33%', flexShrink: 0 }}>
						Advanced settings
					</Typography>
					<Typography sx={{ color: 'text.secondary' }}>
						Filtering has been entirely disabled for whole web server
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
						amet egestas eros, vitae egestas augue. Duis vel est augue.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel4bh-content"
					id="panel4bh-header"
				>
					<Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
				</AccordionSummary>
				<AccordionDetails>

				</AccordionDetails>
			</Accordion>
		</Paper>

		<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FoodCal></FoodCal>
      </Modal>
	</div>)
}

export default TodayView