import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { Avatar, Card, CardActions, CardContent, CardHeader, Collapse, IconButton, Typography } from "@mui/material"


const ExpandMore = styled((props) => {
		const { expand, ...other } = props;
		return <IconButton {...other} />;
	})(({ theme, expand }) => ({
		transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	}));

function InfoCard({header, value, description}) {
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card sx={{ width: 345 }} className="card">
			<CardHeader
				avatar={<Avatar src={header.avatar} />}
				title={header.title}
				subheader={header.subheader}
			/>
			<CardContent className='display-flex'>
				<Typography variant="h5" color="text.secondary" className='flex-1'> {value} </Typography>
				{description && (
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore>
				)}
			</CardContent>

			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph> {description} </Typography>
				</CardContent>
			</Collapse>
		</Card>
	)
}

export default InfoCard;